// ** React Import
import { useState } from 'react'

// ** Custom Components
import Sidebar from '../../sidebar'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'

// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input } from 'reactstrap'
import { UseCreateUser } from '../../../../core/Hook/useMUserApi'
import toast from 'react-hot-toast'


const defaultValues = {
  gmail: '',
  phoneNumber: '',
  firstName: '',
  lastName: '',
  birthDay: '',
}

const checkIsValid = data => {
  return Object.values(data).every(field => (typeof field === 'object' ?field.length > 0: field == null ))
}

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  // ** States
  const [data, setData] = useState(null)
  const [role, setRole] = useState('student')

  // ** Vars
  const {
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })


  const {mutate : createUser} = UseCreateUser(() =>{
    toast.success('کاربر با موفقیت ایجاد شد')
    toggleSidebar()
  })

  const handleCreate = (data) => {
    if (!checkIsValid(data)){
      for (const key in data){
        if (data[key] === null || data[key].toString().trim().length === 0) {
          setError(key, {type: 'manual'})
        }     
    }
    return
  }
    const mappedRole = {
      isStudent : role === "student",
      isTeacher : role === "teacher"
      }
      createUser({
        ...data,
        ...mappedRole,
      })
    
  }

  // ** Function to handle form submit
  const onSubmit = data => {
    setData(data)
    handleCreate(data)
  }

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, '')
    }
    setRole('student')
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
        <div className='mb-1'>
          <Label className='form-label' for='firstName'>
            نام  <span className='text-danger'>*</span>
          </Label>
          <Controller
          
            name='firstName'
            control={control}
            render={({ field }) => (
              <Input id='firstName' placeholder=' نام را وارد کنید' invalid={errors.firstName && true} {...field} />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='lastName'>
          نام خانوادگی <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='lastName'
            control={control}
            render={({ field }) => (
              <Input id='lastName' placeholder='نام خاوادکی را وارد کنید' invalid={errors.lastName && true} {...field} />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='gmail'>
            ایمیل <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='gmail'
            control={control}
            render={({ field }) => (
              <Input
                type='gmail'
                id='gmail'
                placeholder='ایمیل را وارد کنید'
                invalid={errors.gmail && true}
                {...field}
              />
            )}
          />
          <FormText color='muted'>از حروف اعداد و نقطه استفاده کنید</FormText>
        </div>

        <div className='mb-1'>
          <Label className='form-label' for='phoneNumber'>
            شماره تلفن <span className='text-danger'>*</span>
          </Label>
          <Controller
            rules={""}  
          defaultValue=''
            name='phoneNumber'
            type = "number"
            control={control}
            render={({ field }) => {
              console.log("phoneNumber field ==>", field)
              return (
              <Input id='phoneNumber' placeholder='شماره را وارد کنید' invalid={errors.phoneNumber && true} {...field} />
              )
            }}
          />
        </div>
    
        <div className='mb-1'>
          <Label className='form-label' for='password'>
            رمز  <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <Input id='password' type='password' placeholder=' رمز را وارد کنید' invalid={errors.password && true} {...field} />
            )}
          />
        </div>

        <div className='mb-1'>
          <Label className='form-label' for='user-role'>
            نقش
          </Label>
          <Input type='select' id='user-role' name='user-role' value={role} onChange={e => setRole(e.target.value)}>
            <option value='student'>دانش اموز</option>
            <option value='teacher'>معلم</option>
          </Input>
        </div>
        <Button type='submit' className='me-1' color='primary' onClick={() => handleCreate(data)}>
          افزودن کاربر
        </Button>
        <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
          بستن
        </Button>
      </Form>
    </Sidebar>
  )
}

export default SidebarNewUsers
