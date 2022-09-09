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
      <div className="h-full bg-center bg-no-repeat bg-cover bg-community-featured-mobile lg:bg-community-featured">
        <Communities />
        <Featured />
      </div>
      <Signup />
      <Footer />
    </div>
  );
}
