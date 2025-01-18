import React, { FC } from "react";
import { styles } from "../components/common/constants";

//img imports
import gridImg from '../assets/images/Grid.png'

function NavBar(): JSX.Element {
  return (
    <nav className="flex p-4 justify-between items-center">
      {/* hero image here */}
      <span className="px-5 w-1/4 flex justify-center"></span>

      <div className="flex space-x-5 w-1/2 justify-center items-center">
        <p>Opportunities</p>
        <p>Internships</p>
        <p>Contact</p>
      </div>

      <div className="w-1/4 flex justify-end">
        <button className={styles.buttonStyle}> Log in </button>
      </div>
    </nav>
  );
}

function Header(): JSX.Element {
  return (
    <header className="flex flex-col items-center py-24 relative justify-center">
        <img src={gridImg} alt="" className="absolute object-contain w-[800px] aspect-video"/>
      <div className="flex flex-col items-center">
        <p className="text-5xl"> Center for </p>
        <p className="text-5xl"> Competitive Exams </p>

        <p className="my-3 text-themeYellow">
          Turning Aspirants into Achievments
        </p>
        <p className={styles.buttonStyle}> Log in </p>
      </div>
    </header>
  );
}

function About(): JSX.Element {
  return (
    <section className="flex flex-col items-center justify-self-center text-justify relative overflow-hidden">
      {/* bottom left image */}
      <img src={gridImg} alt="" className="absolute translate-x-[-80%] object-contain w-[800px] aspect-video"/>

      {/* bottom right image */}
      <img src={gridImg} alt="" className="absolute translate-x-[80%] object-contain w-[800px] aspect-video"/>

      <p className="text-4xl"> About CCE </p>
      <p className="my-5 text-sm w-[90%]">
        At SNS Institutions, we constantly endeavor to identify the potential
        opportunities for our students to elevate their personality and
        professional competence, which in turn will enhance their socio-economic
        status. To strengthen our endeavor further, a unique center by name
        “Center for Competitive Exams” has been created, which will function
        under the command and control of the Dr Nalin Vimal Kumar, Technical
        Director, SNS Institutions, with an aim to guide and assist students to
        get placed in Indian Armed Forces, Paramilitary Forces, Union & State
        Public Service Commission (UPSC & TNPSC), Defence Research & Development
        Organisation (DRDO) Labs, Council of Scientific & Industrial Research
        (CSIR) Labs, Indian Space Research Organisation (ISRO), Department of
        Science & Technology (DST), Indian Engineering Services, Defence Public
        Sector Undertakings (DPSUs), Central Public Sector Undertakings (CPSUs)
        and State Public Sector Undertakings (SPSUs), in addition to various
        Micro Small & Medium Enterprise (MSME) clusters and Private companies
        associated with the aforesaid organisations. In addition, the center
        will also endeavor to identify opportunities for pursuing Internship &
        Research in renowned Institutions and Organisations. To steer the
        activities in the right direction, Commander (Dr.) D K Karthik (Retd.)
        has been hired and appointed as Professor & Head-Center for Competitive
        Exams, SNS Institutions.
      </p>
    </section>
  );
}

function LandingPage(): JSX.Element {
  return (
    <div>
      <NavBar />
      <Header />
      <About />
    </div>
  );
}

export default LandingPage;
