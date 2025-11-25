// ** Icons Imports
import { Check, X } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardBody, Input, Label } from 'reactstrap'
import { UseAddUserAccess } from '../../../core/Hook/useMUserApi'
import { useEffect, useState } from 'react'

const CustomLabel = ({ htmlFor, enabled }) => {
  console.log("custom:", enabled)
  return (
    <Label className ='form-check-label d-flex align-items-center gap-1' htmlFor={htmlFor} >
      {/* {enabled ?<Check size={14} color='green' /> 
      : <X size={14} />} */}
      {/* <span>{enabled ? "غیر فعال" : "فعال"}</span> */}
    </Label>
  )
}


const SwitchIcons = ({userId, userRoles:userRolesProp}) => {

  const [userRoles, setUserRoles] = useState([]);
  useEffect(() => {
    if (userRolesProp) {
      setUserRoles(userRolesProp);
    }
  },[userRolesProp]);

  const {mutate : toggleAccess} = UseAddUserAccess(() => {
    // setUserRoles((prev) =>{
    //   const hasRole = prev.includes(roleId);
    //   if (enable && !hasRole) return [...prev, roleId]
    //   if (!enable && hasRole) return prev.filter((r) => r !== roleId);
    //   return prev;
    // })
    console.log("نقش با موفقیت تغییر کرد");
  });

  const roles = [
    {id : 1, label : "ادمین"},
    {id : 2, label : "معلم"},
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
      {/* <Card>
       <CardBody>
           <div className='d-flex align-items-center justify-content-center gap-2'>
             <Label for='icon-primary' className='form-check-label mb-50'>
               <span className='fw-bold'>دانش اموز :</span>
             </Label>
             <div className='form-switch form-check-primary '>
               <Input type='switch' defaultChecked id='icon-primary' name='icon-primary' />
               <CustomLabel htmlFor='icon-primary' />
             </div>
           </div>  
       </CardBody>
     </Card> */}
    {/* {roles.map((role) => {
      const isEnabled = userRoles.includes(role.id);
      const switchId = `switch-${role.id}`
      return (
        <Card key={role.id} className='mb-2'>
          <CardBody>              
                <Label for='icon-primary' className ='from-check-label fw-bold mb-1'>
                  {role.lable}
                </Label>
                <div className='d-flex align-items-center justify-content-between'>
                  <Input 
                  type='switch'
                  className='form-check-input'
                  id={switchId}
                  name={switchId}
                  checked ={isEnabled}
                  onChange={(e) => toggleAccess({
                    userId,
                    roleId : role.id,
                    enable : e.target.checked
                  })}
                  />
                  <CustomLabel htmlFor={switchId} enabled={isEnabled} />
                </div>              
          </CardBody>
        </Card>
      
      );
    })} */}
      
    </>
  )
}
export default SwitchIcons
