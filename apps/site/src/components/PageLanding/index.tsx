import useTranslation from 'next-translate/useTranslation';
import Header from './Header';
import Navbar from '../Navbar';
export default function PageLanding() {
  const { t } = useTranslation();

  return (
    <div>
      <Navbar />
      <Header />
      <span>Next components</span>
    </div>
  );
}
