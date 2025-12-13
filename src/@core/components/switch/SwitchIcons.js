// ** Icons Imports
import { Check, X } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardBody, Input, Label } from 'reactstrap'
import { useAddUserAccess } from '../../../core/Hook/useMUserApi'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { data } from 'jquery'
import { useQueryClient } from '@tanstack/react-query'

const CustomLabel = ({ htmlFor, enabled }) => {
  console.log("custom:", enabled)
  return (
    <Label className ='form-check-label d-flex align-items-center gap-1' htmlFor={htmlFor} ></Label>
  )
}


const SwitchIcons = ({userId, userRoles:userRolesProp}) => {

  const [userRoles, setUserRoles] = useState([]);
  const queryClient = useQueryClient();
  const roleMap = {
    admin : 1,
    teacher: 2,
    student: 3
  }
  useEffect(() => {
    console.log("userRolesProp :", userRolesProp)
    if (Array.isArray(userRolesProp)) {
      const name = userRolesProp.map(r => roleMap[r.roleName])
      setUserRoles(name);
    }
  },[userRolesProp]);

  const {mutate : toggleAccess} = useAddUserAccess( {
    onSuccess : (data) => {
      if(data.success){
    setUserRoles((prev) =>{
      const hasRole = prev.includes(data.roleId);
      if (data.enable && !hasRole) return [...prev, data.roleId]
      if (!data.enable && hasRole) return prev.filter((r) => r !== data.roleId);
      return prev;
    })
    console.log("نقش با موفقیت تغییر کرد");
    
      toast.success(data.message || "نقش با موفقیت تغییر کرد")
      queryClient.invalidateQueries(["userRoles", data.userId])
  } else{
    toast.error("خطا در تغییر نقش")
  }
  },
    onError : () => {
      toast.error("خطا در ارتباط با سرور ")
    }
  });

  const roles = [
    {id : 1, label : "ادمین"},
    {id : 2, label : "استاد"},
    {id: 3, label: "دانش اموز"}
  ];
  return (
    <>
    {roles.map((role) => {
      const isEnabled = userRoles.includes(role.id);
      const switchId = `switch-${role.id}`
      return (
        <Card key={role.id}>
          <CardBody> 
            <div className='d-flex align-items-center justify-content-center gap-4'>
              <Label for={switchId} className ='form-check-label mb-50'>
                {role.label}
              </Label>
              <div className='form-switch form-check-primary '>
                <Input type='switch' id={switchId} name={switchId} checked ={isEnabled} 
                  onChange={(e) => {
                    const enable =e.target.checked;
                    setUserRoles((prev) =>{
                      const hasRole = prev.includes(role.id)
                      if (enable && !hasRole) return [...prev, role.id];
                      if(!enable && hasRole) return prev.filter((r) => r !== role.id);
                      return prev
                    });
                    toggleAccess({
                  userId,
                  roleId : role.id,
                  enable
                    })
                }}
                />
                <CustomLabel key={isEnabled} htmlFor={switchId} enabled={isEnabled}/>
              </div>
            </div>        
          </CardBody>
        </Card>
      )
    })}
      
    </>
  )
}
export default SwitchIcons
