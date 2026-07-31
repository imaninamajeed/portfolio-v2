import { FaBriefcase, FaHeart, FaGraduationCap, FaLaptopCode, FaRegUserCircle, FaCode, FaTools, FaCogs, FaProjectDiagram } from 'react-icons/fa';
import Image from 'next/image';

const AboutPage = () => {
    return (
        <div className="flex flex-col bg-gray-50">
            <div className="container mx-auto pt-6 flex-grow max-w-8xl">
                {/* Header Row */}
                <div className="flex flex-col md:flex-row gap-6 mb-6 items-stretch">
                    {/* Profile Picture */}
                    <div className="flex-shrink-0 rounded-lg p-10 shadow-lg flex items-center justify-center transform transition duration-300 ease-in-out hover:scale-105">
                        <Image
                            src="/passport.png"
                            alt="Profile Picture"
                            width={192}
                            height={192}
                            className="w-48 h-48 rounded-full bg-white border-8 border-x-purple-500 shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
                        />
                    </div>

                    {/* About Me & Professional Overview & Personal Interests */}
                    <div className="flex flex-col md:flex-row gap-6 w-full">
                        {/* About Me */}
                        <section className="flex-grow bg-white rounded-lg p-8 shadow-md">
                            <h2 className="text-3xl font-semibold text-purple-600 mb-3 flex items-center whitespace-nowrap">
                                <FaRegUserCircle className="mr-3" /> About Me
                            </h2>
                            <p className="text-gray-700 text-base leading-relaxed font-medium">
                                My name is Imanina, a front-end engineer passionate about creating dynamic web experiences.
                            </p>
                        </section>

                        {/* Professional Overview */}
                        <section className="flex-grow bg-white rounded-lg p-8 shadow-md">
                            <h2 className="text-3xl font-semibold text-purple-600 mb-3 flex items-center whitespace-nowrap">
                                <FaBriefcase className="mr-3" /> Professional Overview
                            </h2>
                            <p className="text-gray-700 text-base leading-relaxed font-medium">
                                Experienced in React and JavaScript, I build apps that drive data decisions and design functional dashboards at Recogine Technology.
                            </p>
                        </section>

                        {/* Personal Interests */}
                        <section className="flex-grow bg-white rounded-lg p-8 shadow-md">
                            <h2 className="text-3xl font-semibold text-purple-600 mb-3 flex items-center whitespace-nowrap">
                                <FaHeart className="mr-3" /> Personal Interests
                            </h2>
                            <p className="text-gray-700 text-base leading-relaxed font-medium">
                                I enjoy exploring, reading, drawing, sports, and continuously improving my web development skills.
                            </p>
                        </section>
                    </div>
                </div>

                {/* Other Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Experience Section */}
                    <section className="bg-white rounded-lg p-8 shadow-md">
                        <h2 className="text-3xl font-semibold text-purple-600 mb-6 flex items-center">
                            <FaBriefcase className="mr-3" /> Experience
                        </h2>

                        {/* Experience 1 */}
                        <div className="mb-8">
                            <div className="mb-2">
                                <p className="font-semibold text-xl text-gray-800">
                                    Engineer (Analytics / R&D)
                                </p>
                                <p className="text-gray-600 text-sm font-semibold">
                                    Recogine Technology | Jan 2022 – Present
                                </p>
                            </div>
                            <ul className="list-disc list-inside space-y-2 text-sm leading-relaxed font-medium">
                                <li>Developed web applications based on user requirements for optimal functionality.</li>
                                <li>Collaborated with teams and stakeholders to define goals and deliver data visualizations.</li>
                            </ul>
                        </div>

                        {/* Experience 2 */}
                        <div className="mb-8">
                            <div className="mb-2">
                                <p className="font-semibold text-xl text-gray-800">
                                    Research Intern
                                </p>
                                <p className="text-gray-600 text-sm font-semibold">Universiti Kebangsaan Malaysia | Mar 2021 – Aug 2021</p>
                            </div>
                            <ul className="list-disc list-inside space-y-2 text-sm leading-relaxed font-medium">
                                <li>Researched Microsoft products to recommend feature enhancements.</li>
                                <li>Assisted in technical documentation for project reports.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Education & Certifications */}
                    <section className="bg-white rounded-lg p-8 shadow-md">
                        <h2 className="text-3xl font-semibold text-purple-600 mb-6 flex items-center">
                            <FaGraduationCap className="mr-3" /> Education & Certifications
                        </h2>

                        <div className="mb-8">
                            <div className="mb-2">
                                <p className="font-semibold text-xl text-gray-800">
                                    Bachelor of Computer Science (Hons.)
                                </p>
                                <p className="text-gray-600 text-sm font-semibold">
                                    Universiti Teknologi MARA (UiTM) | Mar 2018 – Sept 2021
                                </p>
                                <p className="text-gray-600 text-sm font-semibold">
                                    CGPA: 3.51 (First Class)
                                </p>
                            </div>
                        </div>

                        <div className="mb-8">
                            <div className="mb-2">
                                <p className="font-semibold text-xl text-gray-800">
                                    Diploma in Computer Science
                                </p>
                                <p className="text-gray-600 text-sm font-semibold">
                                    Universiti Teknologi MARA (UiTM) | June 2015 – Jan 2018
                                </p>
                                <p className="text-gray-600 text-sm font-semibold">
                                    CGPA: 3.62
                                </p>
                            </div>
                        </div>

                        <div className="mb-8">
                            <div className="mb-2">
                                <p className="font-semibold text-xl text-gray-800">
                                    Certifications
                                </p>
                                <p className="text-gray-600 text-sm font-semibold">
                                    SheCodes Plus (Responsive Web & React Development)                                </p>
                                <p className="text-gray-600 text-sm font-semibold">
                                    Certified Data Analyst (APU)                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Skills Section */}
                    <section className="bg-white rounded-lg p-8 shadow-md">
                        <h2 className="text-3xl font-semibold text-purple-600 mb-6 flex items-center">
                            <FaLaptopCode className="mr-3" /> Technical Skills
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 text-gray-700 text-lg leading-relaxed">

                            {/* <!-- Row 1: Languages & Frameworks --> */}
                            <div className="space-y-4">
                                <p className="font-semibold text-gray-800 text-xl flex items-center">
                                    <FaCode className="mr-2" /> Languages
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-sm font-medium">
                                    <li className="hover:text-purple-600 transition-colors">HTML</li>
                                    <li className="hover:text-purple-600 transition-colors">CSS</li>
                                    <li className="hover:text-purple-600 transition-colors">JavaScript</li>
                                    <li className="hover:text-purple-600 transition-colors">TypeScript</li>
                                    <li className="hover:text-purple-600 transition-colors">C++</li>
                                    <li className="hover:text-purple-600 transition-colors">Python</li>
                                    <li className="hover:text-purple-600 transition-colors">SQL</li>
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <p className="font-semibold text-gray-800 text-xl flex items-center">
                                    <FaCogs className="mr-2" /> Frameworks
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-sm font-medium">
                                    <li className="hover:text-purple-600 transition-colors">React</li>
                                    <li className="hover:text-purple-600 transition-colors">Next.js</li>
                                    <li className="hover:text-purple-600 transition-colors">Node.js</li>
                                </ul>
                            </div>

                            {/* <!-- Row 2: Tools & Methodologies --> */}
                            <div className="space-y-4">
                                <p className="font-semibold text-gray-800 text-xl flex items-center">
                                    <FaTools className="mr-2" /> Tools
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-sm font-medium">
                                    <li className="hover:text-purple-600 transition-colors">GitHub</li>
                                    <li className="hover:text-purple-600 transition-colors">GitLab</li>
                                    <li className="hover:text-purple-600 transition-colors">Postman</li>
                                    <li className="hover:text-purple-600 transition-colors">Docker</li>
                                    <li className="hover:text-purple-600 transition-colors">Grafana</li>
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <p className="font-semibold text-gray-800 text-xl flex items-center">
                                    <FaProjectDiagram className="mr-2" /> Methodologies
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-sm font-medium">
                                    <li className="hover:text-purple-600 transition-colors">Agile</li>
                                    <li className="hover:text-purple-600 transition-colors">Scrum</li>
                                </ul>
                            </div>

                        </div>
                    </section>
                </div>
            </div >
        </div >
    );
};

export default AboutPage;