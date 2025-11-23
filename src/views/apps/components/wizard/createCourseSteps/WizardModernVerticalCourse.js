// ** React Imports
import { useRef, useState } from "react";

// ** Custom Components
import Wizard from "@components/wizard";

// ** Steps
import ThirdStep from "./steps-with-validation/ThirdStep";
import FourthStep from "./steps-with-validation/FourthStep";
import SecondStep from "./steps-with-validation/SecondStep";
import FirstStep from "./steps-with-validation/FirstStep";

// ** Icons Imports
import { FileText, User, MapPin, Link } from "react-feather";
import { useMutation } from "@tanstack/react-query";
import { postCreateCourse } from "../../../../../core/Services/api/CreatCoursesApi";
import toast from "react-hot-toast";

const WizardModernVertical = () => {
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);
  const [allData, setAllData] = useState({
    step1: {},
    step2: {},
    step3: {},
    step4: {},
  });
  const updateStepData = (step, data) => {
    setAllData((prev) => ({
      ...prev,
      [step]: { ...prev[step], ...data },
    }));
  };
  const createMutation = useMutation({
    mutationFn: (formData) => postCreateCourse(formData),
    onSuccess: () => {
      // console.log("Course created successfully", data);
      toast.success("دوره با موفقیت ساخته شد");
      // مثلا می‌تونی به صفحه لیست دوره‌ها بری
    },
    onError: (error) => {
      console.error("Error creating course", error);
      toast.error("خطایی در درست کردن دوره رخ داد");
    },
  });
  const handleSubmitData = (step4Data) => {
    const formData = new FormData();
  
    // step 1
    formData.append("Title", allData.step1.Title);
    formData.append("GoogleTitle", allData.step1.GoogleTitle);
    formData.append("Capacity", allData.step1.Capacity);
    formData.append("Cost", allData.step1.Cost);
    formData.append("StartTime", allData.step1.StartTime);
    formData.append("EndTime", allData.step1.EndTime);
  
    // step 2
    formData.append("SessionNumber", allData.step2.SessionNumber);
    formData.append("CourseLvlId", allData.step2.CourseLvlId);
    formData.append("TremId", allData.step2.TremId);
    formData.append("ClassId", allData.step2.ClassId);
    formData.append("TeacherId", allData.step2.TeacherId);
    formData.append("UniqeUrlString", allData.step2.UniqeUrlString);
    formData.append("ShortLink", allData.step2.ShortLink);
  
    // step 3
    formData.append("MiniDescribe", allData.step3.MiniDescribe);
    formData.append("Describe", JSON.stringify(allData.step3.Describe));
  
    // step 4
    if (step4Data.ImageAddress) formData.append("ImageAddress", step4Data.ImageAddress);
    if (step4Data.Image) formData.append("Image", step4Data.Image);
  
    console.log("formData", formData);
    createMutation.mutate(formData);
  };
  
  const steps = [
    {
      id: "first-info",
      title: "مرحله اول",
      subtitle: "اطلاعات اولیه دوره",
      icon: <User size={18} />,
      content: (
        <FirstStep
          stepper={stepper}
          type="modern-vertical"
          updateStepData={updateStepData}
        />
      ),
    },
    {
      id: "second-info",
      title: "مرحله دوم",
      subtitle: "اطلاعات  دیگر دوره",
      icon: <User size={18} />,
      content: (
        <SecondStep
          stepper={stepper}
          type="modern-vertical"
          updateStepData={updateStepData}
        />
      ),
    },
    {
      id: "third-info",
      title: "مرحله سوم",
      subtitle: "توضیحات دوره",
      icon: <MapPin size={18} />,
      content: (
        <ThirdStep
          stepper={stepper}
          type="modern-vertical"
          updateStepData={updateStepData}
        />
      ),
    },
    {
      id: "social-links",
      title: "Social Links",
      subtitle: "Add Social Links",
      icon: <Link size={18} />,
      content: (
        <FourthStep
          stepper={stepper}
          type="modern-vertical"
          updateStepData={updateStepData}
          handleSubmitData={handleSubmitData}
        />
      ),
    },
  ];

  return (
    <div className="modern-vertical-wizard">
      <Wizard
        type="modern-vertical"
        ref={ref}
        steps={steps}
        options={{
          linear: false,
        }}
        instance={(el) => setStepper(el)}
      />
    </div>
  );
};

export default WizardModernVertical;
