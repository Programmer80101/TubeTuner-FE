"use client";

import Link from "next/link";
import { useState } from "react";
import DotLoader from "@/components/DotLoader";
import Accordion from "@/components/Accordion";
import Dropdown from "@/components/Dropdown";
import Tooltip from "@/components/Tooltip";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import Switch from "@/components/Switch";
import Button from "@/components/Button";
import LinkButton from "@/components/LinkButton";
import Dialog from "@/components/Dialog";
import Checkbox from "@/components/Checkbox";
import Radio from "@/components/Radio";
import MotionOnView from "@/components/MotionOnView";
import Popover from "@/components/Popover";
import Badge from "@/components/Badge";
import Avatar from "@/components/Avatar";
import withPopup from "@/hoc/withPopup";
import withConfetti from "@/hoc/withConfetti";
import useClipboard from "@/hooks/useClipboard";
import useLocalStorage from "@/hooks/useLocalStorage";
import useSessionStorage from "@/hooks/useSessionStorage";
import useToggle from "@/hooks/useToggle";

function Home({ addPopup, triggerConfetti }) {
  const [on, setOn] = useToggle(false);
  const [off, setOff] = useToggle(false);
  const [oof, setOof] = useToggle(true);
  const [pkmn, setPkmn, removePkmn] = useLocalStorage("pkmn", 0);
  const [open, setOpen] = useToggle(false);
  const [morePkmn, setMorePkmn] = useState(2);
  const [name, setName] = useState("");
  const [controlledInput, setControlledInput] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [radioValue, setRadioValue] = useState('option1');
  const [isChecked, setIsChecked] = useToggle(false);
  const [num, setNum] = useState(0);
  const [textarea, setTextarea] = useState("");
  const [isCopied, copy] = useClipboard();
  const [localInput, setLocalInput, removeLocal] = useLocalStorage(
    "testKey",
    "defaultLocal"
  );

  // 2. useSessionStorage hook: persisted only until the tab is closed
  const [sessionInput, setSessionInput, removeSession] = useSessionStorage(
    "sessionKey",
    "defaultSession"
  );

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

  const colors = [
    'neutral',
    'red', 'orange', 'gold', 'yellow', 'lime',
    'green', 'cyan',
    'blue', 'purple'
  ];

  return (
    <div>
      <h1>Frontend Boilerplate</h1>
      <div className="grid place-items-center">
        <Avatar
          src="https://randomuser.me/api/portraits/men/75.jpg"
          alt="Michael Roberts"
        />
      </div>
      <div>
        <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
          <h2>📦 Storage Tester</h2>

          {/* LOCAL STORAGE SECTION */}
          <section style={{ marginBottom: "2rem" }}>
            <h3>🌐 Local Storage (persistent)</h3>
            <p>
              Key: <code>"{`${"PREFIX"}-testKey`}"</code>
            </p>
            <label>
              Local Value:&nbsp;
              <input
                type="text"
                value={localInput}
                onChange={(e) => setLocalInput(e.target.value)}
                style={{ padding: "0.5rem", fontSize: "1rem" }}
              />
            </label>
            <button
              onClick={removeLocal}
              style={{
                marginLeft: "1rem",
                padding: "0.5rem 1rem",
                fontSize: "1rem",
              }}
            >
              Remove Local
            </button>
            <p>
              Current localInput: <strong>{localInput}</strong>
            </p>
            <p style={{ fontSize: "0.9rem", color: "#555" }}>
              → Try opening another tab to see cross-tab synchronization (local
              only)
            </p>
          </section>

          {/* SESSION STORAGE SECTION */}
          <section>
            <h3>🕒 Session Storage (tab-only)</h3>
            <p>
              Key: <code>"{`${"PREFIX"}-sessionKey`}"</code>
            </p>
            <label>
              Session Value:&nbsp;
              <input
                type="text"
                value={sessionInput}
                onChange={(e) => setSessionInput(e.target.value)}
                style={{ padding: "0.5rem", fontSize: "1rem" }}
              />
            </label>
            <button
              onClick={removeSession}
              style={{
                marginLeft: "1rem",
                padding: "0.5rem 1rem",
                fontSize: "1rem",
              }}
            >
              Remove Session
            </button>
            <p>
              Current sessionInput: <strong>{sessionInput}</strong>
            </p>
            <p style={{ fontSize: "0.9rem", color: "#555" }}>
              → Reload the page: this value remains. Close & reopen the tab: it
              resets.
            </p>
          </section>
        </div>
      </div>
      <div>
        <Button color="blue" onClick={() => copy("hello world!")}>
          {isCopied ? "Copied!" : "Copy"}
        </Button>
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Tailwind Color Badges</h2>
        <div className="flex flex-row flex-wrap gap-x-10 gap-y-4">
          {colors.map((col) => (
            <Badge key={col} color={col}>
              {col.charAt(0).toUpperCase() + col.slice(1)}
            </Badge>
          ))}
        </div>
        <Button color="blue" className="relative">
          Inbox
          <Badge
            color="red"
            solid
            className="icon text-xs rounded-full absolute top-0 right-0 -translate-y-1/2 translate-x-1/2"
          >
            5
          </Badge>
        </Button>
      </div>
      <div className="wrapper-xs grid items-center gap-4">
        <h2>Dot Loader</h2>
        <DotLoader count={3} size={4} />
        <Popover
          className="w-32 flex flex-col gap-0.5"
          trigger={"Click Me!"}
        >
          <Button color="transparent" clickAnimation={false}>Edit</Button>
          <Button color="transparent" clickAnimation={false}>View</Button>
          <Button color="transparent" clickAnimation={false}>Share</Button>
        </Popover>
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
        <h2>Link Button</h2>
        <LinkButton href="#" external className="" disabled onClick={() => addPopup("Disabled button clicked!", "gray")} color="gray">Disabled</LinkButton>
        <LinkButton href="#" external outline className="w-full" onClick={() => addPopup("Outline button clicked!", "neutral")}>Outline!</LinkButton>
        <LinkButton href="#" external onClick={() => addPopup("Neutral button clicked!", "neutral")} color="neutral">Link!</LinkButton>
        <LinkButton href="#" external className="w-full" onClick={() => addPopup("Neutral button clicked!", "neutral")} color="neutral">Neutral!</LinkButton>
        <LinkButton href="#" external className="w-full" onClick={() => addPopup("Neutral button clicked!", "neutral")} color="transparent">Ghost Button!</LinkButton>
        <LinkButton href="#" external className="w-full" onClick={() => addPopup("Neutral button clicked!", "neutral")} color="transparent" disabled>Ghost Disabled!</LinkButton>
        <LinkButton href="#" external className="w-full" onClick={() => addPopup("This is danger!", "red")} color="red">Danger!</LinkButton>
        <LinkButton href="#" external className="w-full" onClick={() => addPopup("Default button clicked!", "blue")} color="blue">Default</LinkButton>
        <LinkButton href="#" external className="w-full" onClick={() => addPopup("Success button clicked!", "green")} color="green">Success</LinkButton>
        <LinkButton href="#" external className="w-full" onClick={() => addPopup("Epik button clicked!", "purple")} color="purple">Epik</LinkButton>
        <LinkButton href="#" external className="w-full" onClick={() => addPopup("Warning button clicked!", "yellow")} color="yellow">Warning</LinkButton>
      </MotionOnView>
      <MotionOnView className="wrapper-xs flex justify-center flex-col gap-4">
        <h2>Buttons</h2>
        <Button className="w-full" disabled onClick={() => addPopup("Disabled button clicked!", "gray")} color="gray">Disabled</Button>
        <Button outline className="w-full" onClick={() => addPopup("Outline button clicked!", "neutral")}>Outline!</Button>
        <Button className="w-full" onClick={() => addPopup("Neutral button clicked!", "neutral")} color="neutral">Neutral!</Button>
        <Button className="w-full" onClick={() => addPopup("Neutral button clicked!", "neutral")} color="transparent">Ghost Button!</Button>
        <Button className="w-full" onClick={() => addPopup("Neutral button clicked!", "neutral")} color="transparent" isLoading={true}>Ghost Loading!</Button>
        <Button className="w-full" onClick={() => addPopup("Neutral button clicked!", "neutral")} color="transparent" disabled>Ghost Disabled!</Button>
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
        <Button className="w-full" isLoading onClick={() => addPopup("Warning button clicked!", "yellow")} color="yellow" loadingText="Warning">Warning</Button>
      </MotionOnView>
      <div className="flex flex-col gap-4 wrapper-sm">
        <h2>Form</h2>
        <form className="flex flex-col gap-3">
          <MotionOnView>
            <Input
              id="name"
              label="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              pattern="[a-z]+"
              errorMsg="Only lowercase letters are allowed!"
              helpMsg="Only lowercase letters are allowed!"
              tooltip="hello"
              maxLength="10"
              placeholder="Username"
              required
              showCharacterCount
            />
          </MotionOnView>
          <MotionOnView>
            <Input
              id="userid"
              label="User ID"
              value="surprizedPika123"
              errorMsg="Only lowercase letters are allowed!"
              helpMsg="Only lowercase letters are allowed!"
              tooltip="Already filled for you!"
              placeholder="Username"
              readOnly
            />
          </MotionOnView>
          <MotionOnView>
            <Input
              id="preId"
              label="Premium ID"
              value=""
              errorMsg="Only lowercase letters are allowed!"
              helpMsg="Only lowercase letters are allowed!"
              tooltip="Already filled for you!"
              placeholder="Premium ID"
              disabled
            />
          </MotionOnView>
          <MotionOnView>
            <Input
              id="email"
              label="Email Address"
              type="email"
              value={controlledInput}
              onChange={e => setControlledInput(e.target.value)}
              tooltip={
                <span className="text-green">Your email</span>
              }
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              errorMsg="Invalid Email!"
              placeholder="Email"
            />
          </MotionOnView>
          <MotionOnView>
            <Input
              id="password"
              name="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              errorMsg="Password must contain at least one uppercase character, one lowercase character, one number and a special character!"
              pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$"
              minLength="8"
              helpMsg="Choose a strong password!"
              placeholder="Password"
              tooltip="Choose a strong password! Required field."
              required
            />
          </MotionOnView>
          <MotionOnView>
            <Input
              id="confirm-password"
              name="confirm-password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              tooltip="Confirm your password!"
              error={password !== confirmPassword}
              errorMsg="Passwords don't match"
              placeholder="Confirm Password"
              minLength="8"
              required
            />
          </MotionOnView>
          <MotionOnView>
            <Input
              id="num"
              name="num"
              type="number"
              label="Number Input"
              value={num}
              onChange={(e) => setNum(e.target.value)}
              pattern="[0-9]+"
              min="0"
              max="999"
              errorMsg="Only integers are allowed in the range 0 - 999"
              helpMsg="Range: 0 - 999"
              placeholder="100"
              required
            />
          </MotionOnView>
          <Textarea
            id="textarea0"
            name="textarea0"
            label="Additional Comments"
            placeholder="Enter your interests..."
            value={textarea}
            onChange={(e) => setTextarea(e.target.value)}
            errorMsg="Too short or too long"
            helpMsg="Feel free to add anything!"
            tooltip="Required field. Share your thoughts!"
            minLength={6}
            maxLength={12}
            required
            showCharacterCount
          />
          <Textarea
            id="textarea1"
            name="textarea2"
            label="Motto"
            value="Pika pikachu pika pikachu"
            errorMsg="Too short or too long"
            helpMsg="Feel free to add anything!"
            tooltip="Optional"
            readOnly
            resizeable={false}
            maxLength={30}
          />
          <Textarea
            id="textarea2"
            name="textarea2"
            value="You've already made a suggestion. Wait for it to get approved!"
            label="More Additional Comments "
            placeholder="Enter your interests..."
            errorMsg="Too short or too long"
            helpMsg="Feel free to add anything!"
            tooltip="Optional"
            disabled
          />
          <MotionOnView>
            <p>Choose an option:</p>
            <div className="space-x-4">
              <Radio
                id="opt1"
                name="example"
                label="Option 1"
                value="option1"
                checked={radioValue === 'option1'}
                onChange={(e) => setRadioValue(e.target.value)}
              />
              <Radio
                id="opt2"
                name="example"
                label="Option 2"
                value="option2"
                checked={radioValue === 'option2'}
                onChange={(e) => setRadioValue(e.target.value)}
              />
              <Radio
                id="opt3"
                name="example"
                label="Option 3"
                value="option3"
                checked={radioValue === 'option3'}
                onChange={(e) => setRadioValue(e.target.value)}
                disabled={true}
              />
              <Radio
                id="opt4"
                name="example2"
                label="Option 4"
                value="option3"
                checked={true}
                disabled={true}
              />
            </div>
          </MotionOnView>
          <div>
            <Switch
              id="switchOn"
              label="Switch On"
              checked={on}
              onChange={() => setOn(!on)}
            />
            <Switch
              id="switchOff"
              label="Switch Off"
              checked={off}
              onChange={() => setOff(!off)}
              fullWidth={false}
              disabled
            />
            <Switch
              id="switchOof"
              label="Switch Oof"
              checked={oof}
              onChange={() => setOof(!oof)}
              disabled
            />
          </div>
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
            <Checkbox
              id="agree"
              label="I agree to the terms"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
          </MotionOnView>
          <MotionOnView>
            <Checkbox
              id="cookie"
              label="I agree to using cookies"
              checked={true}
              disabled={true}
            />
          </MotionOnView>
          <MotionOnView>
            <Checkbox
              id="private"
              label="Private Form"
              checked={false}
              disabled={true}
            />
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