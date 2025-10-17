"use client"
import PageTitle from "@/components/global/Titles/PageTitle"
import { useTranslation } from "react-i18next"

const TitlePageContact = () => {
      const {t}=useTranslation('common')

  return (
   <div className="bg-main">
        <PageTitle text={t('contactSub')} title={t('contactUs')}/>
      </div>  )
}
export default TitlePageContact