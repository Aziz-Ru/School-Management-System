import Hero from "@/components/Hero";
import MessageCard from "@/components/MessageCard";
import NoticeCard from "@/components/NoticeCard";
import Image from "next/image";
import { TbNotes } from "react-icons/tb";
import message from "./msg.json";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
        <div className="lg:col-span-8">
          <div className="w-full border flex justify-center">
            <Image
              src={"/image/cpscr.jpeg"}
              alt="vercel"
              width={600}
              height={600}
              // className="w-full h-full"
            />
          </div>
          <div className="text-center py-4">
            <h1 className="text-2xl text-green-500 font-sans font-bold">
              Welcome to Our School
            </h1>
          </div>
          <div className="text-justify px-4 py-2">
            <p>
              The history of Cantonment Public School & College can be traced
              thirty three years back in 1977 when the foundation stone was laid
              by Brig M.A Latif, then the Commander of Northern Zone of
              Bangladesh in Rangpur Cantonment initially for the education of
              the children of Cantonment officers and local elite people.
            </p>
            <p>
              The main purpose behind the establishment of this institution was
              to meet the challenges of the future, building up confident and
              successful students by providing the education on latest
              knowledge, information, communication skills and a vision with a
              blend of Bangladeshi cultural heritage.
            </p>
            <p>
              <span className="font-bold">Opening : </span>The institution
              started functioning in 1978 from Nursery to class VI.
            </p>
            <p>
              <span className="font-bold"> School : </span>Later on, it extended
              up to class X in 1980 and the students first appeared in the S.S.C
              examination of1982.
            </p>
            <p>
              <span className="font-bold">College :</span> With a couple of
              years, the number of students increased and separate branch for
              college was opened in 1981 and the students first appeared in the
              H.S.C examination of 1983. respectively.
            </p>
            <p>
              <span className="font-bold">Degree(Pass):</span> Gradually in
              1995, Degree (pass) Course also started under National University
              of Bangladesh.
            </p>
            <p>
              By the grace of the Almighty God, all the branches are progressing
              day by day in a full swing. The schools, college and Degree course
              have successfully been affiliated with the Board of Intermediate
              and Secondary Education, Dinajpur and National University
            </p>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="">
            {message.messages.map((item, ind) => {
              return (
                <MessageCard
                  key={ind}
                  title={item.title}
                  msg={
                    item.msg.length > 100
                      ? item.msg.substr(0, 100) + "..."
                      : item.msg
                  }
                  imgLink={item.imgLink}
                  path={item.path}
                />
              );
            })}
          </div>
          <div>
            <h1 className="bg-indigo-900 px-4 py-1 gap-2 flex items-center">
              <TbNotes className="text-white text-2xl" />
              <span className="text-2xl text-white font-sans font-bold ">
                Notices
              </span>
            </h1>
            {message.notices.map((item, ind) => {
              return (
                <NoticeCard
                  key={ind}
                  path={item.path}
                  title={item.title}
                  createdAt={item.createdAt}
                  className="my-1"
                />
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
