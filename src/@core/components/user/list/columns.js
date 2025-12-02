// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '../../avatar'

// ** Icons Imports
import { Slack, User, MoreVertical, FileText, Trash2, Archive, Shield, BookOpen } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

// ** Renders Client Columns
const renderClient = row => {
  if (row.pictureAddress) {
    return <Avatar className ='me-1' img={row.pictureAddress} width='32' height ='32' />
  } else {
    return (
      <Avatar
        initials
        className ='me-1'
        color={row.avatarColor || 'light-primary'}
        content={row.fName || 'نامشخص'}
      />
    )
  }
}

// ** Renders Role Columns
const renderRole = role => {
  const roleObj = {
    student: {
      label : "دانش اموز",
      class : 'text-primary',
      icon: User
    },
    teacher: {
      label:"معلم" ,
      class : 'text-success',
      icon: BookOpen
    },
    SuperAdmin: {
      label: "مدیر کل",
      class : 'text-warning',
      icon: Shield
    },
    admin: {
      label: "مدیر",
      class : 'text-danger',
      icon: Slack
    }
  }

  const Icon = roleObj[role] ?.icon || User
  const iconClass = roleObj[role] ?.class || "text-secondary"
  const label = roleObj[role]?.label || "نامشخص"

  return (
    <span key={role} className ='d-inline-flex align-items-center me-1' style={{whiteSpace:'nowrap'}}>
      <Icon size={16} className ={iconClass} />
      <span className='fw-bold ms-1'> {label}</span>
    </span>
  )
}

const statusObj = {  
  true: 'light-success',
  false: 'light-warning',
}

export const columns = ({handleDelete}) => [
  {
    name: 'کاربر',
    sortable: true,
    minWidth: '300px',
    sortField: 'fName',
    selector: row => row.fName,
    cell: row => (
      <div className ='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className ='d-flex flex-column'>
          <Link
            to={`/list/view/${row.id}`}
            className ='user_name text-truncate text-body '
          >
            <span className ='fw-bolder d-block'>{row.fName ? row.fName :'نامشخص' }</span>
            <small className ='text-truncate text-muted d-block mb-0'>{row.gmail}</small>
          </Link>          
        </div>
      </div>
    )
  },
  {
    name: 'نقش',
    sortable: true,
    minWidth: '390px',
    sortField: 'roles',
    // selector: row => row.roles.join(", "),
    cell: row => (
    <div className='d-flex, flex-column'>
      {row.roles.map(role => renderRole(role))}
    </div>
    )
  },
  {
    name: 'درصد تکمیل پروفایل',
    minWidth: '200px',
    sortable: true,
    sortField: 'profileCompletionPercentage',
    selector: row => row.profileCompletionPercentage,
    cell: row => <span className='text-capitalize'>{row.profileCompletionPercentage}</span>
  },
  {
    name: 'وضعیت',
    minWidth: '138px',
    sortable: true,
    sortField: 'active',
    selector: row => row.active,
    cell: row => (
      <Badge className ='text-capitalize' color={statusObj[row.active]}>
        {row.active == true ? "فعال": " غیر فعال"}
      </Badge>
    ),
  },
  
  {
    name: 'عملیات',
    minWidth: '80px',
    cell: row => (
      <div onClick={() => handleDelete(row)} className='w-100'>
        <Trash2 size={14} className='me-50' />
      </div>
    )
  }
]
