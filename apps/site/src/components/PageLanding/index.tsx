import Navbar from '../Navbar';
import Header from './Header';
import Intro from './Intro';
import Partners from './Partners';

export default function PageLanding() {
  return (
    <div>
      <Navbar />
      <Header />
      <Intro />
      <Partners />
      <span>Next components</span>
    </div>
  );
}
