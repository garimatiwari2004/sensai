"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import { AlertTriangle, Download, Edit, Loader2, Monitor, Save } from "lucide-react";
import { use, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resumeSchema } from "@/app/lib/schema";
import { saveResume } from "@/actions/resume";
import { Input } from "@/components/ui/input";
import useFetch from "@/hooks/use-fetch";
import { Textarea } from "@/components/ui/textarea";
import EntryForm from "./entryForm";
import { entriesToMarkdown } from "@/app/lib/helper";
import { set } from "date-fns";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { useUser } from "@clerk/nextjs";
import html2pdf from "html2pdf.js";
import { toast } from "sonner";


const ResumeBuilder = ({ initialContent }) => {
  const [activeTab, setActiveTab] = useState("edit");
  const [resumeMode,setResumeMode]=useState("preview"); 
  const [previewContent,setPreviewContent]=useState(initialContent);
  const [isGenerating,setIsGenerating]=useState(false);
  const {user}=useUser();
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      constactInfo: {},
      summary: "",
      skills: "",
      experience: [],
      education: [],
      projects: [],
    },
  });

  const {
    loading: isSaving,
    fn: saveResumeFn,
    data: saveResult,
    error: saveError,
  } = useFetch(saveResume);

  const formValues = watch();

  useEffect(() => {
    if (initialContent) setActiveTab("preview");
  }, [initialContent]);

  useEffect(()=>{
    if(activeTab==="edit"){
      const newContent=getCombinedContent();
      setPreviewContent(newContent ? newContent :initialContent)
    }

  },[formValues,activeTab]);


  const getContactMarkdown=()=>{
    const {constactInfo}=formValues;
    const parts=[];
    if(constactInfo?.email) parts.push(`📩: ${constactInfo.email}`);
    if(constactInfo?.mobile) parts.push(`📱: ${constactInfo.mobile}`);
    if(constactInfo?.linkedin) parts.push(`📤: ${constactInfo.linkedin}`);
    if(constactInfo?.github) parts.push(`😺: ${constactInfo.github}`);

    return parts.length>0 
    ? `## <div align="center">${user.fullName}</div>
       \n\n<div align="center">\n\n${parts.join(" | ")}\n\n</div>`
    :"";
  };

  const getCombinedContent=()=>{
    const {summary, skills, experience, education, projects}=formValues;

    return[
      getContactMarkdown(),
      summary && `## Professional Summary\n${summary}`,
      skills && `## Skills\n${skills}`,
      entriesToMarkdown(experience,"Work Experience"),
      entriesToMarkdown(education,"Education"),
      entriesToMarkdown(projects,"Projects"),
    ]
    .filter(Boolean)
    .join("\n\n");
  };

  useEffect(()=>{
    if(saveResult && !isSaving){
      toast.success("Saved Successfully");
    }
    if(saveError){
      toast.error(saveError.message || "Failed to save resume");
    }

  },[saveResult,saveError,isSaving]);

  const onSubmit = async (data) => {
    try {
      await saveResumeFn(previewContent);
      
    } catch (error) {
      console.error("Save resume error:",error);
      
    }
  };
  const generatePDF=async()=>{
    setIsGenerating(true);
    try {
      const element=document.getElementById("resumepdf");
      const opt={
        margin:[15,15],
        filename:"resume.pdf",
        image:{type:"jpeg", quality:0.98},
        html2canvas:{scale:2},
        jsPDF:{unit:"mm", format:"a4", orientation:"portrait"},};


      await html2pdf().set(opt).from(element).save();
  
      
    } catch (error) {
      console.error("Error generating PDF:",error);
    }finally{
      setIsGenerating(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <h1 className="font-bold gradient-title text-5xl md:text-6xl">
          {" "}
          Resume Builder
        </h1>

        <div className="space-x-2 mt-4">
          <Button variant="destructive" onClick={onSubmit} disabled={isSaving}>
            {isSaving ? (
              <>
              <Loader2 className="h-4 w-4 animate-spin"/>
              Saving..              
              </>
            ):(
              <>
              <Save className="h-4 w-4" />
              Save
              </>
            )}
            
          </Button>

          <Button onClick={generatePDF} disabled={isGenerating}>

            {isGenerating ? (
              <>
              <Loader2 className="h-4 w-4 animate-spin"/>
              Generating PDF..              
              </>
            ):(
              <>
              <Download className="h-4 w-4" />
              Download PDF

              </>
            )}
            
          </Button>
        </div>
      </div>

      <div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="edit">Form</TabsTrigger>
            <TabsTrigger value="preview">Markdown</TabsTrigger>
          </TabsList>
          <TabsContent value="edit">
            <form className="space-y-8" >
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/50">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      {...register("constactInfo.email")}
                      type="email"
                      placeholder="your@gmail.com"
                      error={errors.constactInfo?.email}
                    />
                    {errors.constactInfo?.email && (
                      <p className="text-sm text-red-500">
                        {errors.constactInfo.email.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Mobile Number</label>
                    <Input
                      {...register("constactInfo.mobile")}
                      type="tel"
                      placeholder="+91 80XXXXXXX"
                      
                    />
                    {errors.constactInfo?.mobile && (
                      <p className="text-sm text-red-500">
                        {errors.constactInfo.mobile.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">LinkedIn</label>
                    <Input
                      {...register("constactInfo.linkedin")}
                      type="url"
                      placeholder="https://www.linkedin.com/in/yourusername"
                      
                    />
                    {errors.constactInfo?.linkedin && (
                      <p className="text-sm text-red-500">
                        {errors.constactInfo.linkedin.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Github Profile</label>
                    <Input
                      {...register("constactInfo.github")}
                      type="url"
                      placeholder="https://www.github.com/yourusername"
                      
                    />
                    {errors.constactInfo?.github && (
                      <p className="text-sm text-red-500">
                        {errors.constactInfo.github.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Professional Summary</h3>
                <Controller
                  name="summary"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                    {...field}
                    className="h-32"
                    placeholder="Write a compelling professional summary.."
                    error={errors.summary}
                />
                  )}
                />
                {errors.summary && (
                  <p className="text-sm text-red-500">{errors.summary.message}</p>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Skills</h3>
                <Controller
                  name="skills"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                    {...field}
                    className="h-32"
                    placeholder="List your key skillsskills.."
                    error={errors.skills}
                />
                  )}
                />
                {errors.skills && (
                  <p className="text-sm text-red-500">{errors.skills.message}</p>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Work Experience</h3>
                <Controller
                  name="experience"
                  control={control}
                  render={({ field }) => (
                    <EntryForm
                    type="Experience"
                    entries={field.value}
                    onChange={field.onChange}
                    
                />
                    
                
                  )}
                />
                {errors.experience && (
                  <p className="text-sm text-red-500">{errors.experience.message}</p>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Education</h3>
                <Controller
                  name="education"
                  control={control}
                  render={({ field }) => (
                    <EntryForm
                    type="Education"
                    entries={field.value}
                    onChange={field.onChange}
                    
                />
                    
                
                  )}
                />
                {errors.education && (
                  <p className="text-sm text-red-500">{errors.education.message}</p>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Project</h3>
                <Controller
                  name="projects"
                  control={control}
                  render={({ field }) => (
                    <EntryForm
                    type="Projects"
                    entries={field.value}
                    onChange={field.onChange}
                    
                />
                    
                
                  )}
                />
                {errors.projects && (
                  <p className="text-sm text-red-500">{errors.projects.message}</p>
                )}
              </div>
            </form>
          </TabsContent>
          <TabsContent value="preview">
            <Button variant="link" type="button" className="mb-4" onClick={()=>setResumeMode(resumeMode==="preview"?"edit":"preview")}>
              {resumeMode === "preview"?(
                <>
                <Edit className="h-4 w-4 mr-2" />
                Edit Resume
                </>
              ):(
                <>
                <Monitor className="h-4 w-4"/>
                Show Preview
                </>
              )}
              
            </Button>

            {resumeMode !== "preview" && (
              <div className="flex p-3 gap-2 items-center border-2 border-yellow-600 text-yellow-600 rounded mb-2">
                <AlertTriangle className="h-5 w-5" />
                <span className="text-sm">
                  You will lose edited markdown if you update the form data
                </span>
              </div>
            )}

            <div className="border rounded-lg">
              <MarkdownEditor
                value={previewContent}
                onChange={setPreviewContent}
                height={800}
                preview={resumeMode}
                

              />
            </div>

            <div className="hidden">
              <div id="resumepdf">
                <MarkdownEditor.Markdown source={previewContent} style={{background:"white", color:"black"}}/>
              </div>

            </div>


          </TabsContent>
        </Tabs>
      </div>
      
    </div>
  );
};

export default ResumeBuilder;
