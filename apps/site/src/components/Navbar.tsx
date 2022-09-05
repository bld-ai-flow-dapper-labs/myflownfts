import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';

export default function Navbar() {
  const { t } = useTranslation();
  return (
    <div className="absolute px-20 h-20 w-screen flex justify-between items-center">
      <div className="flex items-center">
        <Image
          src="/../public/favicon-64x64.png"
          alt="favicon"
          width={47}
          height={47}
        />
        <span className="text-white pl-3">{t('common.title')}</span>
      </div>
      <a
        href="#"
        className="h-[3.125rem] inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        {t('common.buttonConnectWallet')}
      </a>
    </div>
  );
}
