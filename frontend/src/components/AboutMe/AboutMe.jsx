import React from "react";

function AboutMe() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8 px-6">
        <div className="bg-white shadow-xl rounded-lg max-w-4xl w-full p-8">
          <h2 className="text-3xl font-bold text-center text-black mb-6">
            🎵 About Tune Room
          </h2>
          <div className="text-gray-700">
            <p className="text-lg mb-4">
              <strong>Tune Room</strong> is a real-time collaborative music experience where users connect, vibe, and vote together!
            </p>
            <p className="text-lg mb-4">
              Whether you're hosting a virtual hangout or just want to discover songs with friends, Tune Room lets you:
              <br />🔐 <strong>Register</strong> & Login securely to personalize your experience
              <br />🎧 <strong>Create or Join Rooms</strong> using unique 6-digit codes
              <br />💬 <strong>Chat live</strong> with everyone in the room
              <br />🗳️ <strong>Vote</strong> for Songs—the most-voted track plays next!
              <br />📀 Enjoy Seamless <strong>Music Playback</strong> curated by you and your group
            </p>
            <p className="text-lg mb-4">
              Powered by <strong>WebSockets</strong>, Tune Room makes music social again. It’s not just about what’s playing—it’s about who you're playing it with.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutMe;
