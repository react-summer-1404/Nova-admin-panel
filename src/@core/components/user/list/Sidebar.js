// ** React Import
import { useState } from 'react'

// ** Custom Components
import Sidebar from '../../sidebar'

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'

// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input } from 'reactstrap'
import { useCreateUser } from '../../../../core/Hook/useMUserApi'
import toast from 'react-hot-toast'


const defaultValues = {
  gmail: '',
  phoneNumber: '',
  firstName: '',
  lastName: '',
  password: '',
  role : '',
}

const checkIsValid = (data) => {
  if (!data || typeof data !== "object") return false;
  return Object.values(data).every(field => (typeof field === 'object' ?field.length > 0: field == null ),
)
}


const SidebarNewUsers = ({ open, toggleSidebar }) => {
  // ** States
  const [data, setData] = useState(null)
  // const [role, setRole] = useState('student')

  // ** Vars
  const {
    control,
    setValue,
    watch,   
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const role = watch ('role');
  const {mutate : createUser} = useCreateUser({
    onSuccess : () => {
      toast.success('کاربر با موفقیت ایجاد شد');
      toggleSidebar();
    },
    onError : (error) => {
      toast.error(error?.response?.data?.message ||' خطا در ایجاد کابر');
    }
  });

  const handleCreate = (data) => {
    console.log("مقدار data", data)
    console.log("اعتبار سنجی ", checkIsValid(data))
    if (!checkIsValid(data)){
      for (const key in data){
        const value = data[key];
        const isValid = value !== null && value !== undefined &&
        ( typeof value !== "string" || value.trim().length > 0) 
        console.log(`${key} : ${isValid ? "ok" : "notOk"}`)             
    }
    return
  } 
  }

  // ** Function to handle form submit
  const onSubmit = (data) => {
    console.log("نقش انتخاب شده", data.role)
    const mappedRole = {
      isStudent : String(data.role === "student"),
      isTeacher : String(data.role === "teacher"),
    };
      const finalData ={
        ...data,
        ...mappedRole,
      };
      console.log('ارسال نهایی', finalData)
      createUser(finalData);
    console.log("onsubmit user")
  }

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, '')
    }
    
  }

  return (
    <Sidebar
      size='lg'
      open={open}
      title='کاربر جدید'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className ='mb-1'>
          <Label className ='form-label' for='firstName'>
          نام  <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='firstName'
            control={control}
            rules={{required:'نام الزامی است'}}
            render={({field}) => (
              <input id='firstName' className ={`form-control ${errors.firstName ? "is-invalid" : ""}`} type='text' placeholder='نام را وارد کنید' {...field}/>
            )}
          />
          {errors.firstName && <span className='text-danger'>{errors.firstName.message}</span>}
        </div>
        <div className ='mb-1'>
          <Label className ='form-label' for='lastName'>
            نام خانوادگی <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='lastName'
            control={control}
            rules={{required:'نام خانوادگی الزامی است'}}
            render={({field}) => (
              <input id='lastName' className={`form-control ${errors.lastName ? "is-invalid" : ""}`} type='text' placeholder='نام خانوادگی را وارد کنید' {...field}/>
            )}
          />
        {errors.lastName && <span className='text-danger'>{errors.lastName.message}</span>}
        </div>
        <div className ='mb-1'>
          <Label className='form-label' for='gmail'>
            ایمیل<span className='text-danger'>*</span>
          </Label>
          <Controller
            name='gmail'
            control={control}
            rules={{required:'ایمیل الزامی است'}}
            render={({field}) => (
              <input id='gmail' className = {`form-control ${errors.gmail ? "is-invalid" : ""}`} type='text' placeholder='ایمیل را وارد کنید' {...field}/>
            )}
          />
          {errors.gmail && <span className='text-danger'>{errors.gmail.message}</span>}
          <FormText color='muted'>از حروف اعداد و نقطه استفاده کنید</FormText>
        </div>
        <div className ='mb-1'>
          <Label className='form-label' for='phoneNumber'>
          شماره تلفن <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='phoneNumber'
            control={control}
            rules={{required:'شماره تلفن الزامی است'}}
            render={({field}) => (
              <input id='phoneNumber' className={`form-control ${errors.phoneNumber ? "is-invalid" : ""}`} type='text' placeholder='شماره تلفن را وارد کنید' {...field}/>
            )}
          />
          {errors.phoneNumber && <span className='text-danger'>{errors.phoneNumber.message}</span>}
        </div>
        <div className ='mb-1'>
          <Label className='form-label' for='password'>
          رمز  <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='password'
            control={control}
            rules={{required:'رمز الزامی است'}}
            render={({field}) => (
              <input id='password' className={`form-control ${errors.password ? "is-invalid" : ""}`} type='text' placeholder='رمز را وارد کنید' {...field}/>
            )}
          />
          {errors.password && <span className='text-danger'>{errors.password.message}</span>}
        </div>
        <div className ='mb-1'>
        <Label className='form-label' for='mappedRole'>
            نقش
          </Label>
        <Controller
          name='role'
          control={control}
          rules={{required:'نقش الزامی است'}}
          render={({field}) =>(        
            <select  id='mappedRole' className={`form-control ${errors.password ? "is-invalid" : ""}`}
              {...field}>
              <option value='student'>دانش اموز </option>
              <option value='teacher'> معلم </option>
              </select>           
          )}
        />   
        {errors.role && <span className='text-danger'>{errors.role.message}</span>}
        </div>
        
        <Button type='submit' className='me-1' color='primary' onClick={() => handleCreate(data)}>
          ثبت
        </Button>
        <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
          بستن
        </Button>
      </Form>
    </Sidebar>
  )
}

export default SidebarNewUsers
