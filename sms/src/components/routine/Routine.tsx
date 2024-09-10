const Routine = () => {
  //   console.log(params.sectionId);

  return (
    <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <table className="w-full">
        <thead>
          <tr className="grid grid-cols-8 rounded-t-sm bg-blue-600 text-white">
            <th className="flex flex-col h-15 p-1 border site-border text-xs font-semibold sm:text-base xl:p-5">
              <span className="text-end"> hour </span>
              <span className="h2 w-16  sm:w-20 xl:w-32 border rotate-6 sm:rotate-45 "></span>
              <span className="text-start"> Day </span>
            </th>
            <th className="flex h-15 items-center border site-border justify-center rounded-tl-sm p-1 text-xs font-semibold sm:text-base xl:p-5">
              <span>10:00</span>
            </th>
            <th className="flex h-15 items-center border site-border justify-center rounded-tl-sm p-1 text-xs font-semibold sm:text-base xl:p-5">
              <span>11:00</span>
            </th>
            <th className="flex h-15 items-center border site-border justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
              <span>12:00</span>
            </th>
            <th className="flex h-15 items-center border site-border justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
              <span>01:00</span>
            </th>
            <th className="flex h-15 items-center border site-border justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
              <span>02:00</span>
            </th>
            <th className="flex h-15 items-center border site-border justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
              <span>03:00</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* <!-- Line 1 --> */}
          <tr className="grid grid-cols-8">
            <td className="ease relative site-bg h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white xl:hidden">
                SAT
              </span>
              <span className="font-medium text-black dark:text-white hidden xl:block">
                SATURDAY
              </span>
            </td>
            <td className="ease relative site-bg h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white">1</span>
            </td>
            <td className="ease relative site-bg h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white">2</span>
            </td>
            <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white">3</span>
            </td>
            <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white">4</span>
            </td>
            <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white">5</span>
            </td>
            <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white">6</span>
            </td>
            <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white">7</span>
            </td>
          </tr>
          {/* <!-- Line 1 --> */}
          {/* <!-- Line 2 --> */}
          <tr className="grid grid-cols-8">
            <td className="ease relative site-bg h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white xl:hidden">
                SUN
              </span>
              <span className="font-medium text-black dark:text-white hidden xl:block">
                SUNDAY
              </span>
            </td>
            <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white">8</span>
            </td>
            <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white">9</span>
            </td>
            <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white">10</span>
            </td>
            <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white">11</span>
            </td>
            <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white">12</span>
            </td>
            <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white">13</span>
            </td>
            <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white">14</span>
            </td>
          </tr>
          {/* <!-- Line 2 --> */}
          {/* <!-- Line 3 --> */}
          <tr className="grid grid-cols-8">
            <td className="ease relative site-bg h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white xl:hidden">
                MON
              </span>
              <span className="font-medium text-black dark:text-white hidden xl:block">
                MONDAY
              </span>
            </td>
            <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white">15</span>
            </td>
            <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white">16</span>
            </td>
            <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white">17</span>
            </td>
            <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white">18</span>
            </td>
            <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white">19</span>
            </td>
            <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white">20</span>
            </td>
            <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white">21</span>
            </td>
          </tr>
          {/* <!-- Line 3 --> */}
          {/* <!-- Line 4 --> */}
          <tr className="grid grid-cols-8">
            <td className="ease relative site-bg h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white xl:hidden">
                THU
              </span>
              <span className="font-medium text-black dark:text-white hidden xl:block">
                THURSDAY
              </span>
            </td>
            <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white">22</span>
            </td>
            <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white">23</span>
            </td>
            <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white">24</span>
            </td>
            <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white">25</span>
              <div className="group h-16 w-full flex-grow cursor-pointer py-1 md:h-30">
                <span className="group-hover:text-primary md:hidden">More</span>
                <div className="event invisible absolute left-2 z-99 mb-1 flex w-[300%] flex-col rounded-sm border-l-[3px] border-primary bg-gray px-3 py-1 text-left opacity-0 group-hover:visible group-hover:opacity-100 dark:bg-meta-4 md:visible md:w-[290%] md:opacity-100">
                  <span className="event-name text-sm font-semibold text-black dark:text-white">
                    App Design
                  </span>
                  <span className="time text-sm font-medium text-black dark:text-white">
                    25 Dec - 27 Dec
                  </span>
                </div>
              </div>
            </td>
            <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white">26</span>
            </td>
            <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white">27</span>
            </td>
            <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white">28</span>
            </td>
          </tr>
          {/* <!-- Line 4 --> */}
          {/* <!-- Line 5 --> */}
          <tr className="grid grid-cols-8">
            <td className="ease relative site-bg h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white xl:hidden">
                WED
              </span>
              <span className="font-medium text-black dark:text-white hidden xl:block">
                WEDNESDAY
              </span>
            </td>
            <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white">29</span>
            </td>
            <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white">30</span>
            </td>
            <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white">31</span>
            </td>
            <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white">1</span>
            </td>
            <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white">2</span>
            </td>
            <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white">3</span>
            </td>
            <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white">4</span>
            </td>
          </tr>
          <tr className="grid grid-cols-8">
            <td className="ease relative site-bg h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white xl:hidden">
                TUE
              </span>
              <span className="font-medium text-black dark:text-white hidden xl:block">
                TUESDAY
              </span>
            </td>
            <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white">29</span>
            </td>
            <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white">30</span>
            </td>
            <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white">31</span>
            </td>
            <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white">1</span>
            </td>
            <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white">2</span>
            </td>
            <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white">3</span>
            </td>
            <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white">4</span>
            </td>
          </tr>
          {/* <!-- Line 5 --> */}
        </tbody>
      </table>
    </div>
  );
};

export default Routine;
