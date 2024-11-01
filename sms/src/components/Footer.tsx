import Link from "next/link";
import Icon from "./LucidIcon";

const Footer = () => {
  return (
    <footer className=" font-sans bg-indigo-900 text-white py-6">
      <div className="flex flex-col md:flex-row gap-10 justify-around">
        <div className="px-4 py-2">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold">Important Links</h1>
          </div>
          <hr className="py-2" />
          <div className="flex flex-col gap-3">
            <Link href={"/"} className="flex items-center gap-2 border-b">
              <Icon name="ExternalLink" size={18} />
              <span>Education Board Result</span>
            </Link>
            <Link href={"/"} className="flex items-center gap-2 border-b">
              <Icon name="ExternalLink" size={18} />
              <span>Ministry of Education</span>
            </Link>

            <Link href={"/"} className="flex items-center gap-2 border-b">
              <Icon name="ExternalLink" size={18} />
              <span>Directorate of Secondary & Higher Education</span>
            </Link>
          </div>
        </div>
        <div className="px-4 py-2">
          <div>
            <h1 className="text-2xl font-semibold">Conctacts</h1>
          </div>
          <hr className="py-2" />
          <div className="flex flex-col gap-3">
            <Link href={"/"} className="flex items-center gap-2 border-b">
              <Icon name="User" size={18} />
              <span>About School</span>
            </Link>
            <Link href={"/"} className="flex items-center gap-2 border-b">
              <Icon name="HandHelping" size={18} />
              <span>HelpLine</span>
            </Link>
            <Link href={"/"} className="flex items-center gap-2 border-b">
              <Icon name="MapPin" size={18} />
              <span>Location</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-indigo-600 mx-10 my-4 flex flex-col gap-2 justify-around md:flex-row ">
        <div>
          <p className="text-center py-2">
            &copy; 2021 Sms. All Rights Reserved.
          </p>
        </div>
        <div>
          <p className="text-center py-2">&reg; 2021 Developed By The Boys.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
