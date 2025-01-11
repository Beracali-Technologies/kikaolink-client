import React from 'react';
import { SearchIcon } from '../../../assets/Icons/Icons';

const EventList: React.FC = () => {

    return (
        <>
                <div className="flex items-center justify-between p-2 bg-gray-100">
                        {/*Header Text*/}
                        <div className="text-xl font-semibold">
                              My Events
                        </div>


                          <div className="flex flex-row gap-4 items-center">
                                  {/*Search Input*/}
                                  <div className="relative">
                                              <input type="text" placeholder="Search for your events"
                                                      className="border border-gray-300 pl-10 pr-4 py-2 text-sm w-64" />

                                                {/*Search Icon*/}
                                                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                                                        <SearchIcon />
                                                </span>
                                  </div>

                                  {/* Create Event Button */}
                                    <button className="bg-orange-500 text-white px-4 py-2 flex items-center space-x-2">
                                              <span className="font-bold text-xl border-white">+</span>
                                              <span>Create Event</span>
                                    </button>
                          </div>

                </div>
        </>
    )
}

export default EventList;
