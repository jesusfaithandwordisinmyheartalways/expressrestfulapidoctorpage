






import React, { useState } from 'react'
import { useEffect } from 'react'
import '../components/landpage/landpage.css'
import Cross from '../components/images/purplecrosss.png'
import Email from '../components/images/emailicon.png';
import EmailIcon from '../components/images/email.png';
import UserIcon from '../components/images/usericon.png'
import FemaleDoctor from '../components/images/femaldoctor.webp'
import Wifi from '../components/images/wifiicon.png'
import Mute from '../components/images/mute.png'
import Phone from '../components/images/phone.webp'
import User from '../components/images/user.png'
import Tech from '../components/images/tech.png';
import DownArrow from '../components/images/arrrow down.png'
import MobileDoctor from '../components/images/mobile-doctor.png'
import OnlineSchedule from '../components/images/Doctor-Appointment-Scheduling.webp'
import VideoConference from '../components/images/video conference.png'
import Location from '../components/images/location.png';
import FooterPhone from '../components/images/phonecall.png'






interface LandPageText {
  doctorName:string;
}

const Doctor:LandPageText = {
  doctorName: 'Dr Susan Tangle'
}


type DoctorProfession = {
  profession: string;
  tagLine:string;
}


const DoctorStatus:DoctorProfession = {
  profession: 'CERTIFIED MEDICAL FAMILY DOCTOR',
  tagLine: ' We are transforming the future of healthcare with over the top medical professionals that are qualified to provide solutions here in Pittsburgh, PA '
}


   const UserApp = ():void => {
    alert('App download instructions have been sent to your registered')
   }
 

   const EmailApp = ():void => {
      alert('An customer service rep will contact to you momentarily')
   }

   const PhoneApp = ():void => {
      alert('Our team will email you to start the phone consultation ')
   }





const LandPage:React.FC = () => {
   const [scrollTop, setScrollTop] = useState(0);

    useEffect(() =>{
        function userScroll () {
          const scrollPosition =  window.scrollY || document.documentElement.scrollTop
           setScrollTop(scrollPosition)
        };
          window.addEventListener('scroll', userScroll);
          
          return () => {
            window.removeEventListener('scroll', userScroll)
          }
    }, []);



      useEffect(() => {
        document.body.classList.add('welcome-background');
        return () => {
          document.body.classList.remove('welcome-background');
        }
      }, []);

      
    
  return (
   <>

   {/*--------------------------------------HEADER-------------------------------------------*/}
   
      <header className='Header-Container'>
        <div className='Header-Wrapper'>
          <div><div><img src={Cross}></img></div></div>

          <div><div><img src={Email}></img></div></div>

          <div><div><img src={UserIcon}></img></div></div>


        </div>
      </header>
   









   {/*--------------------------------------MAIN CONTENT-------------------------------------------*/}



        <main className='Main-Content'>

          <div className='Main-Wrapper'>

            <div className='Mobile-Doctor-Wrapper'>

              <div className='mobile-text-wrapper'>
                <div><p>9:43</p></div>
                <div><div><img src={Wifi}></img></div></div>
                </div>

              <div className='Female-Doctor-Image'><div><img src={FemaleDoctor}></img></div></div>

              <div className='mobile-text-wrapper-two'>
                  <div><p>{Doctor.doctorName}</p></div>
              </div>

              <div className='mobile-text-wrapper-three'>
                <div><p>{DoctorStatus.profession}</p></div>
              </div>


              <div className='mobile-text-wrapper-four'>
              <div onClick={EmailApp}><img src={EmailIcon}></img><span>Email Dr. Tangle</span></div>
              <div onClick={PhoneApp}><img src={Phone}></img><span>Consultation</span></div>
            </div>



            </div>

           


            <div className='Healthcare-tag-line'>
              <div><h3>FUTURE OF HEALTHCARE </h3></div>
               {<p>{DoctorStatus.tagLine}</p>}

               <div className='Healthcare-icons-wrapper'>
              <div><div><img src={User}></img><span>Trusted by 3.5m +</span></div></div>
              <div><div><img src={Tech}></img><span>AL/ML Technology</span></div></div>

            </div>


             <div className='Healthcare-download-app-wrapper'>
                <div onClick={UserApp}><div>Download The App<img src={DownArrow}></img></div></div>
             </div>

            </div>


          




          </div>





        </main>












   {/*--------------------------------------DOCTOR CONTENT-------------------------------------------*/}


      <div className='Doctor-Content-Container'>
          <div style={{ position: 'relative', top: scrollTop > 150 ? '0px': '50px', transition: 'top 1.5s linear'}}>
              <div><h3 className='Doctor-Content-Wrapper'>Tangle Family Services</h3></div>
          </div>
        </div>





        <div className='Doctor-Content-Container-Two'>
          <div>

            <div className='Doctor-Content-Wrapper-Two'>

               <div style={{ position: 'relative', top: scrollTop > 160 ? '0px' : '60px', transition: 'top 3s linear'}}>
                <div className='payment-management'><h3>Payment Management</h3>
                <div><p>A startup payment management system for a family doctor clinic is 
                  designed to streamline and simplify the billing process, enhancing both patient 
                  experience and clinic operations. The system offers seamless integration 
                  with medical records, allowing easy access to patient data and billing history. 
                  Patients can make payments through various methods, including credit cards, digital
                   wallets, or direct bank transfers, all through a secure online portal. The system ensures 
                   compliance with healthcare regulations, automates invoicing, tracks outstanding payments, 
                   and provides clear financial reports. By reducing manual processes and billing errors, 
                  this solution allows the clinic to focus more on patient care while maintaining steady cash flow.</p></div>
                     <div><span>Learn More</span></div>   
                </div>

               </div>

                <div className={'mobile-doctor-image'} style={{position: 'relative', top: scrollTop > 170 ? '0px' : '70px', transition: 'top 3s linear'}}>
                    <div><img src={MobileDoctor}></img></div> 
                </div>


                <div style={{ position: 'relative', top: scrollTop > 175 ? '0px' : '70px', transition: 'top 3s linear'}}>
                  <div><h3>Secure Bill Pay</h3></div>
                  <div><p>A startup Secure Bill Pay system for a family doctor clinic 
                    focuses on providing a safe and efficient platform for handling patient payments.
                     Built with robust security features like encryption, tokenization, and multi-factor
                      authentication, it ensures that sensitive payment information is protected. 
                      Patients can conveniently settle their bills online through various payment methods, 
                      including credit cards, digital wallets, or bank transfers, while knowing their data is secure.
                       The system integrates with the clinic's billing and patient record systems, 
                       automating invoice generation, payment tracking, and reminders for outstanding balances.
                        With its user-friendly interface and strong security measures, Secure Bill 
                        Pay helps the clinic improve financial management while offering patients
                         a seamless and secure payment experience.</p></div>
                </div>


            </div>

          </div>

        </div>











             {/*--------------------------------------DOCTOR CONTENT TWO-------------------------------------------*/}


             <div className='Doctor-Container-Three'>

                <div style={{position: 'relative', top: scrollTop > 900 ? '0px' : '90px', transition: 'top 2s linear'}}>

                  <div className={'Online-Schedule-Wrapper'}>

                    <div>
                      <div><h3>Dr Tangle Online Scheduling </h3></div>
                      <div><p>An online scheduling appointment system for a family doctor clinic allows patients to book, 
                        reschedule, or cancel appointments easily through a user-friendly web or mobile interface.
                        It integrates with the clinic's calendar, offering real-time availability and automated reminders, 
                        reducing no-shows and administrative workload</p></div>
                    </div>


                    <div ><img src={OnlineSchedule}></img></div>


                  </div>


                </div>



             </div>
             
             
             
             
             
             
             
             
             
             
             
             
             {/*--------------------------------------DOCTOR CONTENT THREE-------------------------------------------*/}


            <div className='Doctor-Container-Four'>

              <div style={{position: 'relative', top: scrollTop > 1250 ? '0px' : '130px', transition: 'top 3s linear'}}>


                <div className='Video-Conference-Wrapper'>

                  <div>
                    <div><h3>Secure Video Conferencing</h3></div>
                    <p>A secure video conferencing solution for a family doctor clinic enables virtual consultations,
                     offering patients convenient access to healthcare while maintaining strict privacy standards.
                      Built with end-to-end encryption and HIPAA compliance, the system ensures that all video calls and patient data remain confidential.
                       It integrates seamlessly with the clinic's appointment scheduling and electronic health record systems, allowing doctors
                        to review patient history and share documents securely during consultations. With features like waiting rooms, session recording 
                        (with patient consent),and multi-device support, the platform provides a safe, flexible, and efficient way for doctors to deliver care remotely.</p>
                        </div>

                  <div><img src={VideoConference}></img></div>


                </div>




              </div>



            </div>
            
            
            
            
            
            
            
            
            




            
            {/*--------------------------------------FOOTER CONTENT-------------------------------------------*/}

            <footer className='Footer-Container'>

                <div>

                    <div className='Footer-Wrapper'>

                      <div className='footer-insurances'>
                        <div><h3>INSURANCES WE ACCEPT</h3></div>
                           <div><p>Long-Term Care Insurance</p></div>
                            <div><p>Supplemental Health Insurance</p></div>
                            <div><p>Short-Term Health Insurance</p></div>
                            <div><p>Catastrophic Health Insurance</p></div>
                            <div><p>Managed Care Plans</p></div>
                            <div><p> Public/Government Health Insurance</p></div>
                            <div><p> Private Health Insurance</p></div>
                      </div>


                      <div className='footer-contact-info'>
                        <div><h3>CONTACT INFO</h3></div>
                          <div><img src={Location}></img><span>4080 Main St, Pittsburgh Pennsylvania 15201</span></div>
                          <div><img src={FooterPhone}></img><span>1888-345-8978 Phone Support: Monday - Friday 9 a.m - 6 p.m (Eastern Time)</span></div>

                      </div>

                    </div>



                </div>




            </footer>
          


   
   
   </>
  )
}

export default LandPage
