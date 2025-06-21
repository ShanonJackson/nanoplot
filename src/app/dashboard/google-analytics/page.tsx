"use client";

import { BarGraphIcon } from "../../../assets/icons";

export default function Page() {
  return (<div className="h-screen flex flex-col bg-gray-100">
    <div className="shadow">
      <Navbar />
    </div>

    <div className="flex flex-1 overflow-hidden">
      <Sidebar />
      <main className="flex flex-col flex-1 overflow-auto mx-8 mt-6 bg-gray-100">
        <ComparisonBar />
        <ToolBar />
        <div className="flex flex-wrap rounded w-full my-8 [&>*]:rounded-md">
        </div>
      </main>
    </div>
  </div>)
}

const Sidebar: React.FC = () => {
  const iconNames = ['/assets/icons/icn_home.png', '/assets/icons/icn_reports.png', '/assets/icons/icn_check-trend.png', '/assets/icons/icn_target.png'];
  return (
    <aside className="bg-gray-100 h-full p-6 shadow-md w-16 border-r border-gray-300">
      <div className="flex flex-col h-full justify-between items-center">
        <ul className="space-y-4 text-gray-700 font-medium [&>*]:cursor-pointer">
          {iconNames.map((item, index) => {
            return <li key={index} className={`flex justify-center items-center w-10 h-10 rounded-full ${index === 1 ? 'bg-blue-400' : 'hover:bg-gray-200'}`}><img className="w-8 h-8" src={item} /></li>
          })}

        </ul>
        <div className="w-8 h-8 flex items-center justify-center cursor-pointer rounded-full hover:bg-gray-200">
          <img src="/assets/icons/icn_settings.png" />
        </div>
      </div>
    </aside>
  );
};

const Navbar: React.FC = () => {
  return (
    <nav className="h-16 bg-white flex items-center justify-between text-gray-500 font-bold">
      <div className="flex items-center [&>*]:mx-4 [&>*]:px-4">
        <div className="flex justify-between items-center !ml-1 !pl-1">
          <BarGraphIcon />
          <h1 className="text-xl ml-2 pl-2">Analytics</h1>
        </div>
        <div className="w-px h-8 !m-0 !p-0 bg-gray-300"></div>
        <select disabled={true} name="All accounts" defaultValue="">
          <option value="">All accounts</option>
        </select>
        <div className="relative w-[512px] h-10 bg-gray-100 rounded !p-0">
          <span className="absolute left-3 top-2 flex justify-center items-center cursor-pointer">
            <img className="h-6" src="/assets/icons/icn_search.png" />
          </span>
          <input className="w-[512px] h-10 bg-gray-100 rounded pl-12" placeholder="Try searching &quot;measurement ID&quot;" /></div>
      </div>
      <div className="flex items-center mx-2 [&>*]:mx-2 [&>*]:cursor-pointer">
        {/* Below div can be replaced with an icon */}
        <div className="w-8 h-8 flex items-center justify-center">
          <img src="/assets/icons/icn_all-menu.png" />
        </div>
        <div className="flex items-center justify-center w-6 h-6 rounded-full"><img src="/assets/icons/icn_help.png" /></div>
        <div className="flex items-center justify-center w-8 h-8 !mr-4 bg-orange-600 rounded-full text-white">S</div>
      </div>
    </nav>
  );
};

const ComparisonBar: React.FC = () => {
  return (
    <div className="flex items-center justify-between shadow h-10 text-gray-500 font-bold">
      <div className="flex justify-start [&>*]:cursor-pointer">
        <div className="flex justify-between items-center px-2 border-2 border-blue-500 bg-blue-100 rounded-full">
          <div className="flex items-center justify-center w-5 h-5 bg-blue-600 rounded-full text-white">A</div>
          <div className="mx-2">All Users</div>
        </div>
        <div className="flex w-[175px] justify-between items-center text-center border-2 border-dotted border-gray-400 rounded-full px-2 mx-2 hover:bg-gray-200">
          <div className="mx-2">Add comparison</div>
          <span className="text-4xl absolute ml-[135px]">+</span>
        </div>
      </div>
      <div className="flex justify-end">
        <span className="text-sm">Last 28 days</span>
        <div className="mx-1">
          <select disabled={true} className="pr-2 bg-gray-100" name="calendar" defaultValue="">
            <option value="">May 15 - Jun 11, 2025</option>
          </select>
        </div>
      </div>
    </div>
  );
}

const ToolBar: React.FC = () => {
  const iconNames = ['/assets/icons/icn_notes.png', '/assets/icons/icn_split.png', '/assets/icons/icn_share.png', '/assets/icons/icn_trend.png'];
  return (
    <div className="flex items-center justify-between mt-4 h-10 text-gray-500 font-bold">
      <div className="flex justify-start border-b-4 border-dashed border-gray-400">
        <div className="text-2xl text-black">Reports snapshot</div>
      </div>
      <div className="flex justify-end [&>*]:cursor-pointer">
        {iconNames.map((item, index) => {
          return <div key={index} className="mx-2 w-8 h-8 hover:bg-gray-200 rounded"><img src={item} /></div>
        })}
      </div>
    </div>
  );
}