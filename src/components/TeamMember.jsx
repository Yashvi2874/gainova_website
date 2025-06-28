import { faLinkedin }from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TeamMember = ({img, name, role}) => {
    return ( 
        <div className="flex flex-col items-center text-center">
            <div className="relative group rounded-full w-60 h-60">
              <img
                className="rounded-full w-full h-full object-cover"
                src={img}
                alt="..."
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-lg font-bold hidden group-hover:flex rounded-full">
                <a
                    href="https://www.linkedin.com/company/zecbay/posts/?feedView=all"
                    target="_blank"
                >
                    <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6 text-white"/>
                </a> 
              </div>
            </div>
            <h3 className="text-2xl font-bold">{name}</h3>
            <p className="text-muted">{role}</p>
          </div>
     );
}
 
export default TeamMember;