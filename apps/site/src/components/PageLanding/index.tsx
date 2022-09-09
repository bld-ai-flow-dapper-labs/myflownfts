import { Navbar, Footer } from '../UI';
import Communities from './Communities';
import Featured from './Featured';
import Header from './Header';
import Intro from './Intro';
import Partners from './Partners';
import Signup from './Signup';

export default function PageLanding() {
  return (
    <div>
      <Navbar />
      <Header />
      <Intro />
      <Partners />
      <div className="bg-community-featured h-fit md:h-[128.375rem] bg-no-repeat bg-cover bg-center">
        <Communities />
        <Featured />
      </div>
      <Signup />
      <Footer />
    </div>
  );
}
