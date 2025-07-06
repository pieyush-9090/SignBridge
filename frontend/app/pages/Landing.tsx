"use client";
import BackgroundPaths from '../components/hero/BackgroundPaths';
import Navbar from '../components/Navbar';
import About from '../components/About';
import Footer from '../components/Footer';
import Action from '../components/Action';

export default function Landing() {
    return (
        <div className="min-h-screen bg-white dark:bg-neutral-950 flex flex-col">
            <Navbar />
            <BackgroundPaths title="SignBridge" />
            <main className="flex-1 flex flex-col">
                <About />
                <Action />
            </main>
            <Footer />
        </div>
    );
}