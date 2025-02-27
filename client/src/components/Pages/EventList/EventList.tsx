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
                                                                <SearchIcon className="font-bold" />
                                                        </span>
                                          </div>

                                          {/* Create Event Button */}
                                            <button className="bg-orange-500 text-white px-4 py-2 flex items-center space-x-2 border border-white">
                                                      <span className="font-bold text-xl">+</span>
                                                      <span>Create Event</span>
                                            </button>
                                  </div>

                </div>

                <div>
                        <h2 className="font-bold text-4xl">Launch your Event</h2>
                        <p className="pt-4 w-100">With KikaoConnect, launching your event has never been easier. Manage every detail effortlessly, connect with your audience, and create unforgettable experiences—all in one platform. Start your journey today and bring your vision to life.</p>
                </div>
        </>
    )
}

export default EventList;
