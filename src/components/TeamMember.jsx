import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub }from '@fortawesome/free-brands-svg-icons'
import { faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const TeamMember = ({img, name, linkedin, mail, github, role}) => {
    return ( 
        <div className="flex flex-col items-center text-center">
            <div className="relative group items-center rounded-full w-60 h-60">
              {img? (
                <img
                className="rounded-full w-full h-full object-cover"
                src={img}
                alt={name}
              />
              ):(
                <FontAwesomeIcon icon={faUser} className="w-40 h-40 object-cover pt-6"/>
              )}

              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-row gap-2 items-center justify-center text-white text-lg font-bold hidden group-hover:flex rounded-full">
                    {linkedin && (
                      <a href={linkedin} target="_blank">
                        <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6 text-white"/>
                    </a> 
                    )}
                    
                    {github && (
                      <a href={`https://github.com/${github}`} target="_blank">
                        <FontAwesomeIcon icon={faGithub} className="w-6 h-6 text-white"/>
                    </a>
                    )}

                    {mail && (
                      <a href={`https://mail.google.com/mail/?view=cm&to=${mail}`} target="_blank">
                        <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6 text-white"/>
                    </a>
                    )}
              </div>
            </div>
            <h3 className="text-2xl font-bold pt-2">{name}</h3>
            {/* <p className="text-muted">{role}</p> */}
          </div>
     );
}
 
export default TeamMember;