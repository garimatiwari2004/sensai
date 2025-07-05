// "use client";

// import React, { useState } from "react";
// import { set, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { onboardingSchema } from "@/app/lib/schema";
// import { useRouter } from "next/navigation";
// import {
//   Card,
//   CardAction,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Label } from "@/components/ui/label";

// const OnboardingForm = ({ industries }) => {
//   const [selectedIndustry, setSelectedIndustry] = useState(null);
//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     watch,
//   } = useForm({
//     resolver: zodResolver(onboardingSchema),
//   });
//  const watchIndustry = watch("industry");
//   return (
//     <div className="flex items-center justify-center bg-background">
//       <Card className=" w-full max-w-lg mt-10 mb-20">
//         <CardHeader>
//           <CardTitle className="gradient-title text-4xl">
//             Complete Your Profile
//           </CardTitle>
//           <CardDescription>
//             Select your industry for recommendations
//           </CardDescription>
//           <CardAction>Card Action</CardAction>
//         </CardHeader>
//         <CardContent>
//           <form >
//             <div className="space-y-2">
//               <Label htmlFor="industry">Industry</Label>
//               <Select
//                 onValueChange={(value) => {
//                   setValue("industry", value);
//                   setSelectedIndustry(
//                     industries.find((ind) => ind.id == value)
//                   );
//                   setValue(subIndustry, ""); // Reset sub-industry when industry changes
//                 }}
//               >
//                 <SelectTrigger className="w-full" id="industry">
//                   <SelectValue placeholder="Select Your Industry" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {industries.map((ind) => {
//                     return (
//                       <SelectItem value={ind.id} key={ind.id}>
//                         {ind.name}
//                       </SelectItem>
//                     );
//                   })}
//                 </SelectContent>
//               </Select>
//               {errors.industry && (
//                 <p className="text-red-500 text-sm">
//                   {errors.industry.message}
//                 </p>
//               )}
//             </div>

//            { <div className="space-y-2">
//               <Label htmlFor="subIndustry">Sub-Industry</Label>
//               <Select
//                 onValueChange={(value) => {
//                   setValue("subIndustry", value);
//                 }}
//               >
//                 <SelectTrigger className="w-full" id="subIndustry">
//                   <SelectValue placeholder="Select Your Sub-Industry" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {selectedIndustry?.subindustries.map((sub) => {
//                     return (
//                       <SelectItem value={sub} key={sub}>
//                         {sub}
//                       </SelectItem>
//                     );
//                   })}
//                 </SelectContent>
//               </Select>
//               {errors.subIndustry && (
//                 <p className="text-red-500 text-sm">
//                   {errors.subIndustry.message}
//                 </p>
//               )}
//             </div>}
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default OnboardingForm;
