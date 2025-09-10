import CommonFooter from '../common-components/footer/page';
import Header from '../common-components/header/page';
import DoctorHeroSection from '../doctors/doctors-component/DoctorHeroSection';
import Map from '../home/components/Map';
import { DoctorDetailsPage } from './doctor-details-components/DoctorDetails'; // Assuming DoctorDetailsPage is in the same directory
import DoctorDetailsHeroSection from './doctor-details-components/DoctorDetailsHeroSection';

export default function DoctorDetails() {
  return (
<>
  <Header/>
  <DoctorDetailsHeroSection/>
  <DoctorDetailsPage/>
  <Map/>
  <CommonFooter/>
</>
  )
}