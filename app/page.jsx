"use client";

import Link from "next/link";
import { useState } from "react";
import DotLoader from "@/components/DotLoader";
import Accordion from "@/components/Accordion";
import Dropdown from "@/components/Dropdown";
import Tooltip from "@/components/Tooltip";
import Switch from "@/components/Switch";
import Button from "@/components/Button";
import Dialog from "@/components/Dialog";
import MotionOnView from "@/components/MotionOnView";
import withPopup from "@/hoc/withPopup";
import withConfetti from "@/hoc/withConfetti";
import useLocalStorage from "@/hooks/useLocalStorage";

function Home({ addPopup, triggerConfetti }) {
  const [on, setOn] = useState(false);
  const [off, setOff] = useState(false);
  const [oof, setOof] = useState(true);
  const [pkmn, setPkmn, removePkmn] = useLocalStorage("pkmn", 0);
  const [open, setOpen] = useState(false);
  const [morePkmn, setMorePkmn] = useState(2);
  const pokemons = [
    "Pikachu",
    "Ash Greninja",
    "Mega Charizard X",
    "Mewtwo",
    "Eevee",
  ]

  const morePkmns = [
    "Eevee",
    "Flareon",
    "Jolteon",
    "Vaporeon",
    "Umbreon",
    "Glaceon",
  ]

  return (
    <div>
      <h1>Frontend Boilerplate</h1>
      <div className="wrapper-xs grid items-center gap-4">
        <h2>Dot Loader</h2>
        <DotLoader count={3} size={4} />
      </div>
      <MotionOnView>
        <div className="grid place-items-center wrapper-xs mt-4">
          <Button
            onClick={triggerConfetti}
            label="Confetti"
            aria-label="Confetti Button"
            color="purple"
          >
            Confetti
          </Button>
        </div>
      </MotionOnView>
      <div className="flex flex-col">
        <h2>Text Colors</h2>
        <p className="text-red">This is red text.</p>
        <p className="text-blue">This is blue text.</p>
        <p className="text-green">This is green text.</p>
        <p className="text-purple">This is purple text.</p>
        <p className="text-yellow">This is yellow text.</p>
        <p className="text-gold">This is gold text.</p>
      </div>
      <div className="p-8">
        <MotionOnView>
          <Button
            onClick={() => setOpen(true)}
            color="blue"
            size={3}
          >
            Open Modal
          </Button>
        </MotionOnView>

        <Dialog
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Example Modal"
        >
          <p>This is a multipurpose modal. You can put any content here.</p>
          <Button
            onClick={() => setOpen(false)}
            color="neutral"
            size={2}
          >
            Close
          </Button>
        </Dialog>
      </div>
      <div className="wrapper-xs flex flex-col items-center justify-center gap-4 my-6">
        <Tooltip content="Hello, I'm a tooltip!" position="right">
          Hover right <Link className="link" href="#">link!</Link> hello
        </Tooltip>
        <Tooltip content="Hello, I'm a tooltip!" position="left">
          Hover left
        </Tooltip>
        <Tooltip content="Hello, I'm a tooltip!" position="top">
          Hover Top
        </Tooltip>
        <Tooltip content="Hello, I'm a tooltip!" position="bottom">
          Hover bottom
        </Tooltip>
      </div>
      <MotionOnView className="wrapper-xs flex justify-center flex-col gap-4">
        <h2>Buttons</h2>
        <Button className="w-full" disabled onClick={() => addPopup("Disabled button clicked!", "gray")} color="gray">Disabled</Button>
        <Button className="w-full" onClick={() => addPopup("Neutral button clicked!", "neutral")} color="neutral">Neutral!</Button>
        <Button className="w-full" isLoading onClick={() => addPopup("Loading button clicked!", "loading")} color="loading" loadingText="Loading...">Loading...</Button>
        <Button className="w-full" isLoading onClick={() => addPopup("Loading button clicked!", "loading")} color="loading" />
        <Button className="w-full" onClick={() => addPopup("This is danger!", "red")} color="red">Danger!</Button>
        <Button className="w-full" isLoading onClick={() => addPopup("Danger button clicked!", "red")} color="red" loadingText="Danger!">Danger!</Button>
        <Button className="w-full" onClick={() => addPopup("Default button clicked!", "blue")} color="blue">Default</Button>
        <Button className="w-full" isLoading onClick={() => addPopup("Default button clicked!", "blue")} color="blue" loadingText="Default">Default</Button>
        <Button className="w-full" onClick={() => addPopup("Success button clicked!", "green")} color="green">Success</Button>
        <Button className="w-full" isLoading onClick={() => addPopup("Success button clicked!", "green")} color="green" loadingText="Success">Success</Button>
        <Button className="w-full" onClick={() => addPopup("Epik button clicked!", "purple")} color="purple">Epik</Button>
        <Button className="w-full" isLoading onClick={() => addPopup("Epik button clicked!", "purple")} color="purple" loadingText="Epik">Epik</Button>
        <Button className="w-full" onClick={() => addPopup("Warning button clicked!", "yellow")} color="yellow">Warning</Button>
        <Button className="w-full" onClick={() => addPopup("Awesome button clicked!", "gold")} color="gold">Awesome!</Button>
        <Button className="w-full" isLoading onClick={() => addPopup("Awesome button clicked!", "gold")} color="gold" loadingText="Awesome!">Awesome!</Button>
      </MotionOnView>
      <div className="flex flex-col gap-4 wrapper-sm">
        <h2>Form</h2>
        <form className="flex flex-col gap-3">
          <MotionOnView>
            <div>
              <label htmlFor="textInput">Text Input:</label>
              <input type="text" id="textInput" placeholder="Enter text" />
            </div>
          </MotionOnView>
          <MotionOnView>
            <div>
              <label htmlFor="emailInput">Email Input:</label>
              <input type="email" id="emailInput" placeholder="Enter email" />
            </div>
          </MotionOnView>
          <MotionOnView>
            <div>
              <label htmlFor="passwordInput">Password Input:</label>
              <input type="password" id="passwordInput" placeholder="Enter password" />
            </div>
          </MotionOnView>
          <MotionOnView>
            <div>
              <label htmlFor="numberInput">Number Input:</label>
              <input type="number" id="numberInput" placeholder="Enter number" />
            </div>
          </MotionOnView>
          <MotionOnView>
            <div>
              <label htmlFor="checkboxInput">
                <input type="checkbox" id="checkboxInput" /> Checkbox
              </label>
            </div>
          </MotionOnView>
          <MotionOnView>
            <div>
              <label htmlFor="radioInput1">
                <input type="radio" id="radioInput1" name="radioGroup" /> Radio Option 1
              </label>
              <label htmlFor="radioInput2">
                <input type="radio" id="radioInput2" name="radioGroup" /> Radio Option 2
              </label>
            </div>
          </MotionOnView>
          <Dropdown
            label="Select an option"
            items={pokemons}
            value={pkmn}
            setValue={setPkmn}
            width={48}
          />
          <Dropdown
            label="Select an pokemon"
            items={morePkmns}
            value={morePkmn}
            setValue={setMorePkmn}
            width={38}
          />
          <MotionOnView>
            <label htmlFor="Pokemon">Dropdown:</label>
            <select id="Pokemon">
              <option value="pikachu">Pikachu</option>
              <option value="ash-greninja">Ash Greninja</option>
              <option value="mega-charizard-x">Mega Charizard X</option>
              <option value="mewtwo">Mewtwo</option>
            </select>
          </MotionOnView>
          <Button type="submit" color="blue" size={3} className="mt-4">Submit</Button>
        </form>
      </div>
      <div className="flex flex-col gap-0">
        <h2>Accordion</h2>
        <Accordion title="What is a YouTube Converter?">
          <span>
            {" "}
            <Link href="#converter" className="link">
              A YouTube converter
            </Link> {" "}
            is a tool that allows you to
            {" "}
            <Link href="/how-to-convert-and-download-youtube-videos" className="link">
              convert and download YouTube videos
            </Link> {" "}
            into audio or video files outside of YouTube.
          </span>
        </Accordion>
        <Accordion title="Is it free to use?">
          <span>
            <strong>Yes</strong>, our
            {" "}
            <Link className="link" href="#converter">converter</Link> {" "}
            has a lot of features and all of them are free. These feature
            also include all the
            {" "}
            <Link className="link" href="#advanced-options">
              Advanced Options
            </Link> {" "}.
          </span>
        </Accordion>
        <Accordion title="Is it safe and secure to use?">
          <span>
            <strong>Yes</strong>,
            we prioritize
            {" "}
            <Link className="link" href="faq">
              user privacy
            </Link> {" "}
            and data security.
            Our services do not store any personal information.
            You can use our converter with confidence knowing that
            your privacy is safeguarded. Only
            {" "}
            <Link href="/faq" className="link">
              user preferences are stored locally
            </Link> {" "}
            . For more concerns check the
            {" "}
            <Link className="link" href="/privacy-policy">
              Privacy Policy
            </Link> {" "}
            and
            {" "}
            <Link className="link" href="/terms-of-service">
              Terms of Service
            </Link> {" "}.
          </span>
        </Accordion>
        <Accordion title="How to convert YouTube videos?">
          <span>
            To convert a YouTube video you will have to
            <strong>copy the URL of the YouTube video</strong>
            and paste it in our
            {" "}
            <Link className="link" href="#converter">converter</Link> {" "}.
            See {" "}
            <Link className="link" href="#how-to-convert">this small tutorial</Link> {" "}
            to understand better. For more details refer to
            {" "}
            <Link href="/how-to-convert-and-download-youtube-videos" className="link">
              our detailed guide
            </Link> {" "}.
          </span>
        </Accordion>
        <Accordion title="How to use Advanced Options?">
          <span>
            To use the advanced options you will have to click on the
            <strong> Advanced Options</strong> option below the URL input
            field. See
            {" "}
            <Link className="link" href="#advanced-options">
              this tutorial
            </Link> {" "}
            about how these options works. Refer to
            {" "}
            <Link className="link" href="/advanced-options">
              our complete guide
            </Link> {" "}
            for more information on how they work.
          </span>
        </Accordion>
      </div>
    </div>
  );
}

export default withConfetti(withPopup(Home));