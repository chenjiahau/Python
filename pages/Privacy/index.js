import mainStyle from 'cloudPages/Terms/terms.module.scss';
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

const Privacy = () => {
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
            <div className={mainStyle['title']} dangerouslySetInnerHTML={{ __html: 'Privacy Policy' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'D-Link Corporation and its family of companies (alternatively referred to herein as "D-Link", "we", "our" or "us") are committed to protecting the privacy of any user (alternatively referred to as "you", "user" or "customer") of certain D-Link site, app and services (collectively "Services") or certain D-Link products ("Products"). We recognize that the trust placed in us by you requires comprehensive and responsible privacy protections, and we are therefore committed to providing you with a positive, easy, and secure online experience.' }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'We recognize the need to maintain the confidentiality of information that you reasonably expect to remain private. You expect, deserve and receive nothing less than our fullest commitment to this goal. We also have an obligation to assist law enforcement and other government agencies responsible for protecting the public welfare, whether it be an individual or the security interests of the entire nation. If and when we are asked to help, we do so strictly within the scope of law and under the most stringent conditions.' }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'This D-Link privacy policy (referred to herein as "Privacy Policy" or "Policy") addresses the privacy of customers domestically and overseas. Where applicable, D-Link will comply with laws that contain requirements that differ from this Policy. IN CERTAIN JURISDICTIONS, D-LINK SHALL ADOPT A SEPARATE PRIVACY POLICY TO REFLECT THE REQUIREMENTS OF APPLICABLE LOCAL LAWS.' }} />
            <div className={mainStyle['space']} />

            <div className={mainStyle['content-title']} dangerouslySetInnerHTML={{ __html: 'Our Privacy Policy Explained' }} />

            <div className={`${mainStyle['article']} ${mainStyle['article--title']}`} dangerouslySetInnerHTML={{ __html: '1. What information is collected or processed?' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'Any information you submit due to the use, purchase, subscription, license request, registration of or for any of the Services or Products may be collected or processed within the scope of and in accordance with specific lawful requirements. In order to better define the type of such information, we have identified and grouped it into four categories:' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'a) Personal information' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'b) General non-specific and demographic information' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'c) Customer proprietary network information' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'd) Product specific information' }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'Personal Information' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'We collect your personal information including information you give us, information collected as a result of your relationship with us and information we may obtain from other sources. Personal information, as defined by this Privacy Policy, is any information that can be used to identify you personally, such as name, address, telephone number, email address, and other information required to provide Services, deliver Products, provide customer support or secure your right of the above. We also collect personal information you entered, such as email address, of your friends, family members, colleagues, and customers if you choose to invite them to access or manage your devices. We may process your personal information only to the extent that such is necessary to perform a contract or deliver Services, for the purposes of legitimate interests, or you have given consent to the processing for one or more specific purposes.' }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'General Non-Specific and Demographic Information' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'Any non-personal information either entered by you or recorded as part of the transaction process is considered to be general non-specific and demographic information. This is information that does not contain personal information, and may include experience with Products such as the type and quantities of Products purchased, your web browser and operating system types, the identity of the web page from which your browser entered our site, and any other demographic information such as title, educational and employment background, professional interests, which does not specifically identify any one individual. Such information is typically collected by the use of cookies, web logs, and web beacons.' }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: "We may collect web usage information, such as the pages you visit on our sites, your Internet Protocol (IP) address, behavior (i.e. the pages you view, the links you click, the amount of time you spend on such pages, and whether you re-visit our sites or pages and other actions you take in connection with D-Link sites) and Product information. Such information may be tracked by recording the Uniform Resource Locator (URL), as well as your computer's IP address." }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'Customer Proprietary Network Information' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'Should we provide Services to you in telecommunications form, we may collect and maintain certain customer proprietary network information ("CPNI"). Your CPNI may include the types of Services you receive, usage information, user IDs and passwords, billing and transaction information.' }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'Product Specific Information Collected' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'The evolution of Products and Services will necessitate the collection of more information. Each Product or type of Services will require specific information to be collected in support of the Product features and in order to continue to provide you with the best experience possible. Each Product or type of Services may collect some or all of the following:' }} />
            <ul>
              <li><div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'Information provided by you during the setup or installation process' }} /></li>
              <li><div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'Sound and image recognition, including but not limited to voice, noise and face' }} /></li>
              <li><div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'Environmental data, including but not limited to temperature, ambient light, humidity, CO2 levels, precipitation, moisture, noise decibels and motion from the Product sensors' }} /></li>
              <li><div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'Your preferred settings for Products or Services, including but not limited to room and product temperature, scheduling, alerts and notifications' }} /></li>
              <li><div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'Utilities usage data' }} /></li>
              <li><div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'Technical information from the Product' }} /></li>
              <li><div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'Audio and video signals and data' }} /></li>
              <li><div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'Geolocation' }} /></li>
              <li><div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'Account access log' }} /></li>
            </ul>
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{
              __html: 'Information provided by you during the setup or installation process: When you install a Product or type of Services, you may be asked your Product name and its location within the premises, to better help you identify the Product when accessing it through a remote device. Additionally, you will need to provide your SSID (Wi-Fi network name) and password so that the Product can connect to the Internet.'
            }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'Sound and Image: Certain Products may contain sensors and software that is capable of detecting voice commands, detecting different sounds, like glass breaking or smoke/fire alarms, as well as recognizing certain facial features. Such features may be used to allow your Products to interact with other products or provide a better user experience.' }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'Environmental data: Sensors may be built into Products that allow us to collect data such as temperature, ambient light, humidity, CO2 levels, precipitation, moisture, noise decibels and motion from the Products. By collecting this data, Products can take actions like turning on lights if motion is detected.' }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'Your preferred settings for Products or Services : By collecting this information, D-Link can better understand customer usage of features and improve the overall customer experience.' }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'Utilities usage data: In an effort to help you conserve energy, Products may collect information including duration of device usage, water consumption, utilization of power saving modes, and moisture levels so that we can provide you the relevant data to better help you conserve resources.' }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'Technical information from the Product: D-Link strives to improve upon your experience. By collecting technical information we are better able to troubleshoot problems. Some of the information we gather is model and serial number, software version, and technical information such as signal strength, sensor status, and remaining battery life.' }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'Audio and video signals and data: Some Products provide you with the ability to record or stream audio and video. Depending upon your personal configuration and settings, D-Link may capture the audio and video recordings from the Products in order to email clips or sections of this data in support of motion detection or other notification events. Furthermore, if you have enabled cloud recording, we will collect and store the audio and video data from your device for the applicable period supported by your Product.' }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'Geolocation: Our Services need the permission to access your location on your mobile device when you install our Products. This is necessary for our Services to set up the network connections on the Products that you are installing. Our Services do not retrieve from your mobile device the exact GPS location. No location data will be stored by our Services without your permission.' }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'Account access log: Account access log stored on our servers will be automatically deleted in thirty (30) days from their creation dates, while those stored on the cloud storage servers may be retained for customer service purposes for up to one hundred and eighty (180) days.' }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'Privacy and data protection laws vary by jurisdiction and yours may impose certain responsibilities on your use of our Products and Services. You, not D-Link, are responsible for ensuring compliance with any applicable laws when you use our Products and Services. For example, some jurisdictions may require you to obtain prior consent before recording or sharing audio or video of a third party.' }} />
            <div className={mainStyle['space']} />

            <div className={`${mainStyle['article']} ${mainStyle['article--title']}`} dangerouslySetInnerHTML={{ __html: '2. What do we use the information for?' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'In order to provide you with the best online experience possible, we collect both your personal and non-personal information to give us a better understanding of the demographic and geographic profile. The information we collect is reviewed closely to assist us in determining the most popular products or services of interest to you, update you on our new Services and benefits, to personalize Services for you and to better design Products and Services to suit your needs.' }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'Products will capture video and audio data and analyze these data if you choose to enable motion, sound and person detection, or other artificial intelligence features and services. The data are analyzed by our Products or Services, depending on the complexity of the artificial intelligence technologies which enable the features or Services. By enabling the features or Services, you agree to allow us to collect and analyze the video and audio data. We do not access your video, audio, or images without your permission.' }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'By tracking your IP address through our Services, we can better understand the types of products, services and information that are relevant to you, and may from time to time use this information to provide you with information or promotions that match your various geographical and demographic dynamics.' }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'From time to time, we may send surveys to you via email or online through our Services in order to solicit feedback on improvements we should make to our products and services. These surveys are completed on a voluntary basis and personal and general information are not required. Refusal to complete any survey or poll will not result in any penalization of the customer standings with our organization. Should you not wish to receive notification of subsequent surveys or polls, you can click the link supplied at the bottom of every promotional email we send you to request that you not receive such notifications in the future.' }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'We may also run contests or sweepstakes at different times. By entering the sweepstakes you agree to disclose your personal information for our use in future marketing campaigns. Your consent for our use of your information may be a condition of your participation and eligibility for any such contest or sweepstakes.' }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'In some cases we may combine web usage information related to your access to our Services with personal information. We use the combined information to provide customers with a better experience by providing customized features, Services, and advertising. Once combined, the resulting data is protected as personal information as described in this Policy.' }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'Our digital propert(ies) may use cookies and similar tracking technologies to collect information and infer your interests for interest-based advertising purposes. If you would prefer to not receive personalized ads based on your browser or device usage, you may generally express your opt-out preference to no longer receive tailored advertisements. Please note that you will continue to see advertisements, but they will no longer be tailored to your interests.' }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'To opt-out of interest-based advertising by participating companies in the following consumer choice mechanisms, please visit: Network Advertising Initiative (NAI)’s self-regulatory opt-out page (http://optout.networkadvertising.org/).' }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'We may occasionally provide you with the ability to create personal profile areas and view protected content. Your personal and other information may be required for such purposes.' }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'Additional ways in which we may use your personal and other information include: exchanging information for purposes of accepting customer feedback and providing support, allowing you to forward information to another individual such as a friend or co-worker, and meeting contractual obligations. We will send your friend a one-time email inviting them to access our Services. D-Link stores this information which is only used for the sole purpose of sending this one-time email or tracking the success of our referral program. Your friend may contact us at the contact information listed below to request that we remove this information from our database.' }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'Should you contact us via the “Contact Us” page on our site, or via email, telephone or written correspondence, we may keep your comments on file for future use in our contact database.' }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'D-Link or our service providers may collect, process and store your personal information in locations outside your home country where our servers reside. Privacy and data protections and regulations in other countries, including the rights of the authorities to gain access of your personal information, may not be equivalent to those in your country. If you are using our Products or Services in the European Union or other regions with laws governing data collection and use that may differ from the laws where your data is collected, processed and stored, you agree to the transfer of personal information to the country where we operate or locate our servers.' }} />
            <div className={mainStyle['space']} />

            <div className={`${mainStyle['article']} ${mainStyle['article--title']}`} dangerouslySetInnerHTML={{ __html: '3. How do we share your Information?' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'Your personal information will not be sold, traded, or rented to third-parties unless you grant us permission to do so and except as otherwise stated in this Policy.' }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'We may share your personal information within D-Link for purposes of data processing or storage according to the law. We may also provide personal information to trusted partners who are acting on behalf of or with D-Link under confidentiality agreements and in a lawful manner. These companies may use your personal information to help D-Link communicate with you about offers from D-Link and our marketing partners within the scope of law. However, these companies do not have any independent right to share your information.' }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'When we use third parties to assist us in processing your personal information, we require that these parties agree to process such information strictly in accordance with our instructions and in compliance with this Policy and any other appropriate confidentiality and security measures. To the extent permitted by law, D-Link does not assume any liability for third parties that have been provided with information as permitted by this Privacy Policy or who have collected information as permitted by this Privacy Policy.' }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'Some Products within their technical environment communicate with one another. These Products will share information to help provide you with the best experience possible. For example, you may setup an event that directs a motion sensor in your garage to turn on a light connected to a smart plug in your house when motion is detected.' }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'We may respond to subpoenas, court orders, or legal process by disclosing your personal information and other related information if required by law or regulation or in response to lawful requests by public authorities. We also may use your personal information to establish or exercise our legal rights or defend against legal claims.' }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: "We may share personal information and any other additional information available to us in order to investigate, prevent, or take actions regarding illegal activities, suspected fraud, situations involving potential threats to the physical safety of any person including D-Link employees, violations of any D-Link's terms of use, or as otherwise required by law or regulation." }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'We are committed to respecting and protecting your CPNI. Except as may be required by law or authorized by you, we do not sell, trade, or share your CPNI, including your calling records with anyone outside of D-Link or with anyone not authorized to represent us to offer our products or services, or to perform functions on our behalf.' }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'Generally, we may use your CPNI in the provision of Services you purchase, including billing and collections for those Services. Additionally, we are permitted to use or disclose CPNI to offer telecommunications services of the same type that you already purchase from us. We may also use or disclose your CPNI for legal or regulatory reasons such as in response to a court order or subpoena, or to investigate fraud and prevent the unlawful use of our network and services. We may additionally use CPNI to protect other customers.' }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: "We will ask you for your opt-in consent to share your personal information with a third party for any purpose not described above or as otherwise required by applicable law or regulation. Circumstances may arise where, whether for strategic or other business reasons, D-Link decides to sell, buy, merge or otherwise reorganize businesses in some countries. Such a transaction may involve the disclosure of personal information to prospective or actual purchasers, or the receipt of it from sellers. It is D-Link's practice to seek appropriate protection for information in these types of transactions. You will be notified via email and/or a prominent notice on our site of any change in ownership or uses of your personal information, as well as any choices you may have regarding your personal information." }} />
            <div className={mainStyle['space']} />

            <div className={`${mainStyle['article']} ${mainStyle['article--title']}`} dangerouslySetInnerHTML={{ __html: '4. Your Choice' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'You can help ensure that your contact information and preferences are accurate, complete, and up to date by logging in to your D-Link account. D-Link will not share or use your personal information provided to or received by us online in ways contrary to this Policy without informing you first and offering you a choice. You may choose to stop receiving our marketing messages by following the unsubscribe instructions included in these messages. If you don’t want to be on our mailing list, you can opt out anytime by logging into your D-Link account to update the preference of My Profile. Should we ever desire to share your information with third parties that are not acting on our behalf and governed by our Privacy Policy, we will first obtain your permission.' }} />
            <div className={mainStyle['space']} />

            <div className={`${mainStyle['article']} ${mainStyle['article--title']}`} dangerouslySetInnerHTML={{ __html: '5. How do we use automatic data collection tools?' }} />
            <div className={`${mainStyle['content']} ${mainStyle['content--bold']}`} dangerouslySetInnerHTML={{ __html: 'Cookies' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'D-Link or a third party acting on our behalf may use cookies to tailor and improve the content we deliver to our customers, to improve our Services by assessing which areas, features, and products are most popular, and to personalize our Services and make recommendations based on the information, including product choices that a particular user has previously provided. We may also use cookies to store user preferences, complete online order activity, and keep track of transactions.' }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'You can configure your web browser to alert you when a site is attempting to send a cookie to your device and allow you to accept or refuse the cookie. You may stop or restrict the placement of cookies on your device, including third party cookies, or delete cookies previously accepted, by adjusting your web browser preferences. Some web pages may not work correctly if you have cookies disabled. The use of cookies by our partners, affiliates, tracking utility company, service providers is not covered by our Privacy Policy. We do not have access or control over these cookies. Our partners, affiliates, tracking utility company, service providers use session ID cookies to make it easier for you to navigate our site.' }} />
            <div className={mainStyle['space']} />
            <div className={`${mainStyle['content']} ${mainStyle['content--bold']}`} dangerouslySetInnerHTML={{ __html: 'Web Beacons' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'Web beacons (also known as "clear gifs" or "one-pixel gifs") are small graphic images on a web page or in an email that allow us to monitor the activity regarding our Services or to make cookies more effective. D-Link or a third party acting on our behalf may use web beacons in certain of our pages and emails to gauge the effectiveness of our marketing efforts and email correspondence. We do not tie the information gathered by these web beacons to our customers’ personal information.' }} />

            <div className={`${mainStyle['article']} ${mainStyle['article--title']}`} dangerouslySetInnerHTML={{ __html: '6. How do we keep your personal information secure?' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'We maintain a variety of physical, electronic, and procedural safeguards to protect your personal information. When you are ordering Services via our site, we use the Internet encryption protocol Secure Sockets Layer (SSL) to protect the security of your personal information. The SSL protocol is also implemented for (i) guarding your account information, and (ii) securing all logs of settings and Services of your devices. D-Link will continue to revise its policies and implement additional security features as new technologies become available. However, no system or service can provide an absolute assurance of security, especially Services that rely to some extent on the Internet. Therefore, by using our Services, you acknowledge the risk that third parties may gain unauthorized access to your information. If we determine that a security breach has occurred and that such breach creates a risk of identity theft or service disruption, we will make reasonable attempts to notify you.' }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: "You should understand data via online transmission is not completely secure. We cannot guarantee full protection and security data, only that we take all reasonable actions to protect information sent to us electronically. Transmission of any data by you is at your own risk. Where applicable you may be given access to our Services that require a password. You are responsible for the password's safety and confidentiality." }} />
            <div className={mainStyle['space']} />

            <div className={`${mainStyle['article']} ${mainStyle['article--title']}`} dangerouslySetInnerHTML={{ __html: '7. Accuracy and Access' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'D-Link endeavors to maintain the accuracy of your personal information. If you have questions concerning our collecting or processing of your personal information, we will be pleased to provide information that is related to you. If your personal information changes, or if you no longer desire our Services, you may have the right within the scope of law to correct, update, amend, restrict, delete, remove or deactivate it by contacting us, provided that legal requirements are met. We will usually respond to your request to access no more than ten (10) days.' }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'We will retain your information for as long as your account is active or as needed to provide you Services and for a certain period of time within the scope of law from the date of your last interaction with us. We will retain and use your information as necessary to comply with our legal obligations, resolve disputes, and enforce our agreements.' }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'Links to third party sites through the Services are provided solely as a convenience to you. Use of these links by you will cause you to leave our sites. D-Link has not reviewed these third party sites and does not control and is not responsible for any of them, their content or their privacy policy. If you are asked to provide information on these sites or in connection with services provided by these sites, we strongly encourage you to carefully review their privacy policies before sharing any information. D-Link neither endorses nor makes any representations about any third party sites, or any information, software or other products or materials found therein, or any results that may be obtained from using such third party sites. Your access of any third party sites is at your own risk.' }} />
            <div className={mainStyle['space']} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'Our Services may include social media features such as the Facebook Like button, and widgets such as the ShareThis button or interactive mini-programs that run on our site. These features may collect your IP address, which page you are visiting on our site, and may set a cookie to enable the feature to function properly. Social media features and widgets are either hosted by a third party or hosted directly on our site. Your interactions with these features are governed by the privacy policy of the company providing it.' }} />
            <div className={mainStyle['space']} />
            <div className={`${mainStyle['content']} ${mainStyle['content--bold']}`} dangerouslySetInnerHTML={{ __html: 'Facebook Connect or Open ID' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'You may log in to our Services using sign-in services such as Facebook Connect or an Open ID provider. These services will authenticate your identity and provide you the option to share certain personal information with us such as your name and email address to pre-populate our sign up form. Services like Facebook Connect give you the option to post information about your activities on this site to your profile page to share with others within your network.' }} />
            <div className={mainStyle['space']} />

            <div className={`${mainStyle['article']} ${mainStyle['article--title']}`} dangerouslySetInnerHTML={{ __html: '8. Effective Date and Policy Updates' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'This Privacy Policy is made effective as of May 25th, 2020 and supersedes and replaces all previously posted privacy policies. We reserve the right to update our Privacy Policy from time to time. When we change the Policy in a material way, a notice will be posted on our site along with the updated Privacy Policy prior to the change becoming effective. When you visit our site the next time, you should once again read the updated Privacy Policy.' }} />
            <div className={mainStyle['space']} />

            <div className={`${mainStyle['article']} ${mainStyle['article--title']}`} dangerouslySetInnerHTML={{ __html: '9. Our Commitment to Your Privacy' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'As we are committed to the security of your personal information, we communicate our privacy and security guidelines to D-Link employees and strictly enforce our privacy safeguards. Nevertheless, you shall always have the right to lodge a complaint with the authorities responsible for the supervision of personal information protection.' }} />
            <div className={mainStyle['space']} />

            <div className={`${mainStyle['article']} ${mainStyle['article--title']}`} dangerouslySetInnerHTML={{ __html: '10. Contact Us' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'If you have a question about this Privacy Policy, or wish to inquire about our personal information handling practices, please contact us as follows:' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'D-Link Corporation' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'No. 289. Xinhu 3rd Road, Neihu Distrct' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: 'Taipei City, Taiwan' }} />
            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: "<a href=\"https://www.dlink.com/support\" target=\"_blank\">https://www.dlink.com/support<a/>" }} />
            <div className={mainStyle['space']} />

            <div className={mainStyle['content']} dangerouslySetInnerHTML={{ __html: "If you have an unresolved privacy or data use concern that we have not addressed satisfactorily, please contact our U.S.-based third party dispute resolution provider (free of charge) at <a href=\"https://feedback-form.truste.com/watchdog/request\" target=\"_blank\">https://feedback-form.truste.com/watchdog/request<a/>." }} />
            <div className={mainStyle['space']} />
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}

export default Privacy;