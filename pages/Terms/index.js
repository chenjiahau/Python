import mainStyle from './terms.module.scss';
import logoNuclias from 'assets/img/v2/icon/logo_nuclias_cloud.png';
import iconLanguage from 'assets/img/v2/icon/icon_language_normal.png';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { cloneDeep } from 'lodash';

// UI
import Footer from 'cloudUi/Footer';

// Component
import DropdownWithItem from 'components/DropdownWithItem';

// Default variable
const defaultLangItemList = [
  { title: 'English', isActive: true },
  { title: '日本語', isActive: false }
];

const Terms = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // State
  const [langItemList, setLangItemList] = useState(cloneDeep(defaultLangItemList));
  const [newLangList, setNewLangList] = useState(cloneDeep(defaultLangItemList));
  const selectedLangItem = useMemo(() => newLangList.filter(langItem => langItem.isActive)[0], [newLangList]);

  return (
    <>
      <div className="main-container">
        <div className="layout-container layout-container--column layout-container--fluid">
          {
            +searchParams.get('l') === 1 && (
              <>
                <div className={`${mainStyle['lang']} mt-5`}>
                  <div>
                    <img
                      src={iconLanguage}
                      className="icon btn-dropdown"
                      id="langDropdown"
                      data-bs-toggle="dropdown"
                      alt={selectedLangItem.title}
                    />
                    <DropdownWithItem
                      id="lang-dropdown"
                      extendClassName={mainStyle['btn-dropdown']}
                      selectedItem={selectedLangItem}
                      itemList={newLangList}
                      onClick={item => { }}
                    />
                  </div>
                </div>

                <div className={`${mainStyle['logo']} mt-5`}>
                  <a href="/login">
                    <img src={logoNuclias} alt="Nuclias" />
                  </a>
                </div>
              </>
            )
          }

          <div className={mainStyle['page']}>
            <div className={mainStyle['title']} dangerouslySetInnerHTML={{ __html: 'Terms of Use' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'This Terms of Use (referred to as “Terms”) serve as an agreement between D-Link Corporation (referred to as “we”, “us” or “Nuclias”) and you, the end customer or purchaser (referred to as “Customer” or “you”) of our services and products (referred to as “Services”). Upon purchase and use of Nuclias Services, you agree to the Terms on behalf of yourself and all persons or organizations for whom you are acting.  Should you find any part of the Terms not agreeable, you must immediately cease your use of Nuclias Services.' }} />
            <div className={mainStyle['space']} />

            <div className={mainStyle['content-title']} dangerouslySetInnerHTML={{ __html: 'Article 1. Rights, Responsibilities and Restrictions' }} />
            <div className={mainStyle['article']} dangerouslySetInnerHTML={{ __html: '1.1. Nuclias Rights' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'You acknowledge and agree that Nuclias owns and reserves all intellectual property rights regarding the software and hardware provided in the Services. Any feedbacks related to the Services from you are considered as property of Nuclias to use or disclose, without any form of reimbursement and compensation to you. ' }} />
            <div className={mainStyle['article']} dangerouslySetInnerHTML={{ __html: '1.2. Customer Responsibilities' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'You represent and warrant that you are of legal age and possess the legal rights and ability to enter into, accept and comply with the Terms and you have read and understand the Terms fully and comprehensively. You shall use the Services in accordance with the specifications available, the Terms, and all applicable laws that govern the conduct of use in the industry, such as the export laws and regulations of the country where your business activities take place. If we detect any violation, we may cease providing the Services to you without your consent. When creating an account to use the Services, you agree to provide us true, accurate, current and complete information about you. If you provide any information that is, or we have reasonable grounds to believe is, untrue, inaccurate, misleading, not current or incomplete, we may suspend or terminate your account and/or Services, or any portion thereof. You acknowledge that you, not Nuclias, are solely responsible for keeping your accounts secret and safe. We are not responsible for damages resulting from your failure to keep the confidentiality of your accounts.' }} />
            <div className={mainStyle['article']} dangerouslySetInnerHTML={{ __html: '1.3. Restrictions' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'You and any users under or associated to your organization or business are prohibited from modifying, reverse-engineering or replicating the hardware or the source code of any part of the Services, directly or indirectly. Doing so constitutes as breach of contract and we may cease all functions of the Services at our discretion and without compensation to you.' }} />
            <div className={mainStyle['space']} />

            <div className={mainStyle['content-title']} dangerouslySetInnerHTML={{ __html: 'Article 2. Licenses' }} />
            <div className={mainStyle['article']} dangerouslySetInnerHTML={{ __html: '2.1. Paid Licenses' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'By purchasing Nuclias products and under the conditions set forth in the Terms, Nuclias grants you a non-exclusive, non-sublicensable and non-transferable license to use Nuclias Services, which covers the firmware on the hardware (“<strong>Firmware Licenses</strong>”), and the hosted software within the Services on the Internet (“<strong>Hosted Software Licenses</strong>”). The Firmware Licenses on hardware will not function without valid Hosted Software Licenses. You shall not exceed the scope of the license granted hereunder. Any rights not expressly granted by Nuclias to you are reserved by Nuclias, and all implied licenses are hereby disclaimed. The license fees may vary according to subscription plans. A one (1)- year license is calculated as three hundred and sixty-five (365) days.' }} />
            <div className={mainStyle['article']} dangerouslySetInnerHTML={{ __html: '2.2. Third-Party Licenses' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: "Certain part of our Services may incorporate third-party software, including free and open source software (\"<strong>Third-Party Software</strong>\"), which are subject to additional terms and conditions. The Third-Party Software is provided to you under and subject to those additional terms and conditions. Such Third-Party Software is mostly likely included in the Services and provided to you without additional cost, unless otherwise specified." }} />
            <div className={mainStyle['space']} />

            <div className={mainStyle['content-title']} dangerouslySetInnerHTML={{ __html: 'Article 3. Ownership of Information' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'By using the hardware, data collected through the usage of Customer’s networks are processed and stored by Nuclias. We use this information for providing the Services to you, and to the extent necessary to protect our rights when in dispute with you or as required by law.' }} />
            <div className={mainStyle['space']} />

            <div className={mainStyle['content-title']} dangerouslySetInnerHTML={{ __html: 'Article 4. Privacy Policy' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: "Our Privacy Policy (available at <a href=\"#/privacy\">https://www.nuclias.com/#/privacy</a>) is hereby incorporated into the Terms by reference. Please read the Privacy Policy carefully for information relating to our collection, use, storage and disclosure of personal information, including registration and other information about you that we collect through the Services." }} />
            <div className={mainStyle['space']} />

            <div className={mainStyle['content-title']} dangerouslySetInnerHTML={{ __html: 'Article 5. Warranty' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'We will use our best efforts to keep the Services up and running uninterrupted. We however make no warranties, express or implied, including but not limited to any implied warranties of merchantability, fitness of any service or product for a particular purpose, title or non-infringement or any warranty arising by usage of trade, course of dealing or course of performance. In addition, we do not warrant that Nuclias website, apps, services or products will be without failure, delay, interruption, error, or loss of content, data or information.' }} />
            <div className={mainStyle['space']} />

            <div className={mainStyle['content-title']} dangerouslySetInnerHTML={{ __html: 'Article 6. Indemnity' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: "You shall defend, indemnify and hold harmless Nuclias and its officers, directors, affiliates, employees and licensors, and any other service provider who furnishes services to you for our Services, from and against any and all claims, losses, damages, fines, penalties, costs, and expenses (including, without limitation, attorneys' fees): (A) made by any third party due to or arising out of your breach of this agreement, or your violation of any law or the rights of a third party, and (B) incurred by, or on behalf of, you or any third party or user of the Services, relating to the Services, including, without limitation, emergency dialing, or your device, or use of the Services by you or others using your account (whether or not such usage is expressly authorized by you)." }} />
            <div className={mainStyle['space']} />

            <div className={mainStyle['content-title']} dangerouslySetInnerHTML={{ __html: 'Article 7. Limitation of Liability' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: "We shall not be liable for any indirect, incidental, exemplary, special, consequential or punitive damages, loss of profits, business interruption, reputational harm, or loss of data or information. In no event, for all damages, losses and causes of action arising from the Terms and your use of the Services, shall Nuclias' aggregate liability to you or anyone who uses your accounts exceed equivalent of USD 50." }} />
            <div className={mainStyle['space']} />

            <div className={mainStyle['content-title']} dangerouslySetInnerHTML={{ __html: 'Article 8. Confidentiality' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'To the extent authorized by the law, the parties may, from time to time, in connection with the Services contemplated under the Terms, disclose confidential information to each other (“Confidential Information”), which shall include engineering documents, manuals, software, program listings, data file printouts, and other technical and marketing information marked or shall reasonably be deemed as confidential disclosed by us. Each party will use reasonable efforts to prevent the disclosure of any of the other party’s Confidential Information to third parties, provided that the recipient party’s obligation shall not apply to information that:' }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'a. is not disclosed in writing or reduced to writing and so marked with an appropriate confidentiality legend within thirty (30) days of disclosure;' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'b. is already in the recipient party’s possession at the time of disclosure thereof;' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'c. is or later becomes part of the public domain through no fault of the recipient party;' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'd. is received from a third party having no obligations of confidentiality to the disclosing party;' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'e. is independently developed by the recipient party; or' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'f. is required by law or regulation to be disclosed.' }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'In the event that information is required to be disclosed pursuant to subsection f. and to the extent authorized by the law, the party required to make disclosure shall notify the other to allow that party to assert whatever exclusions or exemptions may be available to it under such law or regulation.' }} />

            <div className={mainStyle['content-title']} dangerouslySetInnerHTML={{ __html: 'Article 9. Termination' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: "We may limit, suspend or cease providing the Services to you if you fail to comply with the Terms, or if you use the Services in a way that causes or may cause legal liability to us or disrupt others' use of the Services.We may also cease providing the Services if we begin investigating suspected misconduct by you.There might be time- sensitive situations that we decide to take immediate actions, and we may terminate the Services to you without notice. You may also choose to terminate the Services for cause if we breach the Terms and fail to remedy the situation within fifteen (15) days after the receipt of written notice from you. Upon termination for cause, we will refund the amount equal to the remaining time on the Hosted Software Licenses. Termination of the Terms will stop all your Firmware Licenses and Hosted Software Licenses from functioning. Articles 1.1, 5, 6 and 7 will survive any termination of the Services." }} />
            <div className={mainStyle['space']} />

            <div className={mainStyle['content-title']} dangerouslySetInnerHTML={{ __html: 'Article 10. Governing Law' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'Claims or disputes related to or arising under the Terms shall be governed by the laws of Taiwan, R.O.C. You however acknowledge and understand that your use of Nuclias Services may be subject to other local, state, national, and international laws. You hereby agree to submit to exclusive jurisdiction of Taiwan Shihlin District Court for any claim or dispute arising out of or related to the Terms, including claims related to the Nuclias website, services and products, involving Nuclias or its affiliates, subsidiaries, employees, contractors, officers, directors, telecommunication providers and content providers.' }} />
            <div className={mainStyle['space']} />

            <div className={mainStyle['content-title']} dangerouslySetInnerHTML={{ __html: 'Article 11. Variation or Amendment of the Terms' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: "We may make changes to the Terms from time to time. If we do, we will modify the \"last update\" date. You acknowledge and agree that access or use of the Services after an updated version of the Terms having been made available on our website indicates your acceptance of the updated Terms." }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'Last updated on Aug. 20th, 2018' }} />
            <div className={mainStyle['space']} />

          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}

export default Terms;