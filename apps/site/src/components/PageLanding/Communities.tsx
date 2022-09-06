import useTranslation from 'next-translate/useTranslation';
import { ReactComponent as StarIcon } from './images/icon-star-yellow.svg';
import NavButtons from '../NavButtons';
import CommunityCard from './CommunityCard';
import communities from './communities.json';

export default function Communities() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-[3.375rem] pt-[8.375rem] px-[16.75rem]">
      <div className="flex justify-between py-4">
        <div className="flex items-center gap-12">
          <StarIcon />
          <span className="font-bold text-white text-section">
            {t('pages.landing.ourCommunities')}
          </span>
          <StarIcon />
        </div>
        <NavButtons />
      </div>
      <div className="flex gap-6 overflow-x-scroll">
        {communities.map((item) => (
          <CommunityCard
            key={item.key}
            name={item.name}
            image={item.image}
            url={item.url}
          />
        ))}
      </div>
    </div>
  );
}
