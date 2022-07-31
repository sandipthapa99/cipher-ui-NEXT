import Breadcrum from "@components/common/Breadcrum";
import Layout from "@components/Layout";
import { Container } from "react-bootstrap";

const TermsConditions = () => {
    return (
        <Layout title="Terms &amp; Conditions | Cipher">
            <Breadcrum currentPage="Terms &amp; Conditions" />
            <Container fluid="xl">
                <section className="privacy-policy">
                    <section className="privacy-policy__intro inner-section">
                        <h1>Terms &amp; Conditions</h1>

                        <p>Welcome to Cipher</p>
                        <p>
                            These terms and conditions outline the rules and
                            regulations for the use of Cipher&apos;s Website,
                            located at Cipher.com.
                        </p>
                        <p>
                            By accessing this website we assume you accept these
                            terms and conditions. Do not continue to use Website
                            Name if you do not agree to take all of the terms
                            and conditions stated on this page.
                        </p>
                        <p>
                            The following terminology applies to these Terms and
                            Conditions, Privacy Statement and Disclaimer Notice
                            and all Agreements: “Client”, “You” and “Your”
                            refers to you, the person log on this website and
                            compliant to the Company&apos;s terms and
                            conditions. “The Company”, “Ourselves”, “We”, “Our”
                            and “Us”, refers to our Company. “Party”, “Parties”,
                            or “Us”, refers to both the Client and ourselves.
                            All terms refer to the offer, acceptance and
                            consideration of payment necessary to undertake the
                            process of our assistance to the Client in the most
                            appropriate manner for the express purpose of
                            meeting the Client&apos;s needs in respect of
                            provision of the Company&apos;s stated services, in
                            accordance with and subject to, prevailing law of
                            Netherlands. Any use of the above terminology or
                            other words in the singular, plural, capitalization
                            and/or he/she or they, are taken as interchangeable
                            and therefore as referring to same.
                        </p>
                    </section>
                    <section className="privacy-policy__personal-data-collection inner-section">
                        <h2>Cookies</h2>
                        <p>
                            We employ the use of cookies. By accessing Website
                            Name, you agreed to use cookies in agreement with
                            the Company Name&apos;s Privacy Policy.
                            <br />
                            Most interactive websites use cookies to let us
                            retrieve the user&apos;s details for each visit.
                            Cookies are used by our website to enable the
                            functionality of certain areas to make it easier for
                            people visiting our website. Some of our
                            affiliate/advertising partners may also use cookies.
                        </p>
                    </section>
                    <section className="privacy-policy__personal-data-usage inner-section">
                        <h2>License</h2>
                        <p>
                            Unless otherwise stated, Company Name and/or its
                            licensors own the intellectual property rights for
                            all material on Website Name. All intellectual
                            property rights are reserved. You may access this
                            from Website Name for your own personal use
                            subjected to restrictions set in these terms and
                            conditions.
                        </p>

                        <p>You must not:</p>

                        <p>
                            Republish material from Website Name
                            <br />
                            Sell, rent or sub-license material from Website Name
                            <br />
                            Reproduce, duplicate or copy material from Website
                            Name
                            <br />
                            Redistribute content from Website Name
                            <br />
                            This Agreement shall begin on the date hereof.
                            <br />
                        </p>

                        <p>
                            Parts of this website offer an opportunity for users
                            to post and exchange opinions and information in
                            certain areas of the website. Company Name does not
                            filter, edit, publish or review Comments prior to
                            their presence on the website. Comments do not
                            reflect the views and opinions of Company Name,its
                            agents and/or affiliates. Comments reflect the views
                            and opinions of the person who post their views and
                            opinions. To the extent permitted by applicable
                            laws, Company Name shall not be liable for the
                            Comments or for any liability, damages or expenses
                            caused and/or suffered as a result of any use of
                            and/or posting of and/or appearance of the Comments
                            on this website.u
                        </p>

                        <p>
                            Company Name reserves the right to monitor all
                            Comments and to remove any Comments which can be
                            considered inappropriate, offensive or causes breach
                            of these Terms and Conditions.
                        </p>

                        <p>You warrant and represent that:</p>

                        <p>
                            You are entitled to post the Comments on our website
                            and have all necessary licenses and consents to do
                            so;
                            <br />
                            The Comments do not invade any intellectual property
                            right, including without limitation copyright,
                            patent or trademark of any third party;
                            <br />
                            The Comments do not contain any defamatory,
                            libelous, offensive, indecent or otherwise unlawful
                            material which is an invasion of privacy
                            <br />
                            The Comments will not be used to solicit or promote
                            business or custom or present commercial activities
                            or unlawful activity.
                            <br />
                            You hereby grant Company Name a non-exclusive
                            license to use, reproduce, edit and authorize others
                            to use, reproduce and edit any of your Comments in
                            any and all forms, formats or media.
                        </p>
                    </section>
                </section>
            </Container>
        </Layout>
    );
};
export default TermsConditions;
