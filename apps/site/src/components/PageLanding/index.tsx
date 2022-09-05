import Navbar from '../Navbar';
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
      <div className="bg-community-featured h-[122.25rem]">
        <Communities />
        <Featured />
      </div>
      <Signup />
      <span>Next components</span>
    </div>
  );
}
