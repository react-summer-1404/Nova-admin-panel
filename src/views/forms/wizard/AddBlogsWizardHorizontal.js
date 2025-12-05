// ** React Imports
import { useRef, useState } from "react";

// ** Custom Components
import Wizard from "@components/wizard";

// ** Steps
import AddBlogMainInfo from "./steps/AddBlogMainInfo";
import AddBlogsKeywords from "./steps/AddBlogsKeywords";
import AddBlogsSlider from "./steps/AddBlogSlider";
import AddBlogsImge from "./steps/AddBlogsImge";

const AddBlogsWizardHorizontal = () => {
  // ** Ref
  const ref = useRef(null);

  // ** States
  const [stepper, setStepper] = useState(null);
  const [formData,setFormData] = useState({})

  const steps = [
    {
      id: "main-info",
      title: "اطلاعات اصلی",
      subtitle: "عنوان و توضیحات خبر",
      content: <AddBlogMainInfo stepper={stepper} setFormData={setFormData} />,
    },
    {
      id: "blog-addKeyword",
      title: "سیو و کلیدواژه",
      subtitle: "عنوان و توضیحات گوگل",
      content: <AddBlogsKeywords stepper={stepper} setFormData={setFormData}/>,
    },
    {
      id: "blog-addSlider",
      title: "دسته بندی و اسلایدر",
      subtitle: "انتخاب دسته بندی و اسلایدر",
      content: <AddBlogsSlider stepper={stepper} setFormData={setFormData}/>,
    },
    {
      id: "blog-addImage",
      title: "تصویر و تایید",
      subtitle: "انتخاب تصویر و ثبت نهایی",
      content: <AddBlogsImge stepper={stepper} setFormData={setFormData} formData={formData}/>,
    },
  ];

  return (
    <div className="horizontal-wizard">
      <Wizard instance={(el) => setStepper(el)} ref={ref} steps={steps} />
    </div>
  );
};

export default AddBlogsWizardHorizontal;
