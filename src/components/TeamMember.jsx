import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub }from '@fortawesome/free-brands-svg-icons'
import { faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import './TeamMember.css';

const TeamMember = ({img, name, linkedin, mail, github, role}) => {
    return ( 
        <div className="flex flex-col items-center text-center team-member">
            <div className="relative group items-center rounded-full w-60 h-60 max-md:w-48 max-md:h-48 max-sm:w-40 max-sm:h-40 team-member-image">
              {img? (
                <img
                className="rounded-full w-full h-full object-cover transition-all duration-300"
                src={img}
                alt={name}
              />
              ):(
                <FontAwesomeIcon icon={faUser} className="w-40 h-40 object-cover pt-6 max-md:w-32 max-md:h-32 max-sm:w-24 max-sm:h-24"/>
              )}

              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-row gap-2 items-center justify-center text-white text-lg font-bold hidden group-hover:flex rounded-full transition-all duration-300">
                    {linkedin && (
                      <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200">
                        <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6 text-white max-md:w-5 max-md:h-5"/>
                    </a> 
                    )}
                    
                    {github && (
                      <a href={`https://github.com/${github}`} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200">
                        <FontAwesomeIcon icon={faGithub} className="w-6 h-6 text-white max-md:w-5 max-md:h-5"/>
                    </a>
                    )}

                    {mail && (
                      <a href={`https://mail.google.com/mail/?view=cm&to=${mail}`} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200">
                        <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6 text-white max-md:w-5 max-md:h-5"/>
                    </a>
                    )}
              </div>
            </div>
            <h3 className="text-2xl font-bold pt-2 max-md:text-xl max-sm:text-lg team-member-name">{name}</h3>
            {/* <p className="text-muted">{role}</p> */}
          </div>
     );
}
 
export default TeamMember;