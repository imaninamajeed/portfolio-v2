"use client";
const page = () => {
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        alert('Sorry, this page is unavailable now. You can proceed to the footer to contact me.');
    };
    return (
        <div className="flex flex-col">
            <div className="container mx-auto p-6 flex-grow max-w-lg">
                <h1 className="mt-12 text-4xl font-extrabold text-center text-indigo-700 mb-6">
                    Get in Touch
                </h1>
                <p className="text-center text-gray-700 text-lg mb-8">
                    Have a question or just want to say hi? Reach out!
                </p>
                <form className="space-y-6 bg-white p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-base font-semibold text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-base font-semibold text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="yourname@example.com"
                            className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-base font-semibold text-gray-700">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            placeholder="What's on your mind?"
                            className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white font-semibold text-lg py-3 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition-all"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default page;