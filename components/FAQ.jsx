import Accordion from "@/components/Accordion";

export default function FAQSection() {
  return (
    <section className="faq-section">
      <h2 className="faq-heading">Frequently Asked Questions</h2>
      <div className="faq-list">
        <Accordion title="🎧 What is Tubetuner?">
          <p>
            Tubetuner is a web-based application that allows you to convert YouTube videos into high-quality MP3 audio files. It's designed for ease of use, ensuring quick and efficient conversions without the need for additional software installations.
          </p>
        </Accordion>

        <Accordion title="📥 How do I convert a YouTube video to MP3?">
          <p>
            Simply paste the URL of the YouTube video into the input field on our homepage and click the "Convert" button. Tubetuner will process the video and provide a download link for the MP3 file once the conversion is complete.
          </p>
        </Accordion>

        <Accordion title="🛡️ Is Tubetuner safe to use?">
          <p>
            Absolutely. Tubetuner prioritizes user safety by ensuring a secure browsing experience. We do not require any software downloads, and our platform is free from intrusive ads and malware.
          </p>
        </Accordion>

        <Accordion title="⚖️ Is it legal to convert YouTube videos to MP3?">
          <p>
            Converting YouTube videos to MP3 is legal for personal use, especially for content that is in the public domain or for which you have permission. However, downloading copyrighted material without authorization may violate YouTube's terms of service and local laws. Always ensure you have the right to download and convert the content.
          </p>
        </Accordion>

        <Accordion title="🎚️ What audio quality does Tubetuner provide?">
          <p>
            Tubetuner offers MP3 conversions at 320kbps, ensuring high-quality audio suitable for most listening experiences.
          </p>
        </Accordion>

        <Accordion title="📱 Can I use Tubetuner on mobile devices?">
          <p>
            Yes, Tubetuner is fully responsive and compatible with various devices, including smartphones and tablets. You can convert and download MP3 files directly to your mobile device.
          </p>
        </Accordion>

        <Accordion title="🔄 Why is the conversion taking longer than expected?">
          <p>
            Conversion times can vary based on video length and server load. If a conversion is taking unusually long, please check your internet connection or try refreshing the page and initiating the process again.
          </p>
        </Accordion>

        <Accordion title="🧩 Do I need to install any software or browser extensions?">
          <p>
            No installations are necessary. Tubetuner operates entirely within your web browser, eliminating the need for additional software or extensions.
          </p>
        </Accordion>

        <Accordion title="📂 Where are the downloaded MP3 files saved?">
          <p>
            Downloaded files are typically saved in your device's default "Downloads" folder. You can change this location through your browser's settings if desired.
          </p>
        </Accordion>

        <Accordion title="📧 How can I contact support if I encounter issues?">
          <p>
            If you experience any problems or have questions, please reach out to our support team via the "Contact Us" link at the bottom of the homepage. We're here to help!
          </p>
        </Accordion>
      </div>
    </section>
  );
}
