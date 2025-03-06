'use client';
import { useState, useEffect } from 'react';
import { FaCrosshairs } from 'react-icons/fa';
import { MdVisibility } from 'react-icons/md';
import { IoSettings } from 'react-icons/io5';
import { VscFiles } from 'react-icons/vsc';
import styles from './page.module.css';
import Window from './components/Window';
import Tab from './components/Tab';
import Section from './components/Section';
import Toggle from './components/Toggle';
import Slider from './components/Slider';
import { TooltipProvider, TooltipTrigger } from './components/Tooltip';
import Dropdown from './components/Dropdown';
import ColorPicker from './components/ColorPicker';
import Input from './components/Input';
import Config from './core/Config';
import List from './components/List';
import Button from './components/Button';
import Label from './components/Label';
import ButtonRow from './components/ButtonRow';

export default function Page() {
  const [aimbotEnabled, setAimbotEnabled] = useState(false);
  const [fov, setFov] = useState(90);
  const [smoothing, setSmoothing] = useState(50);
  const [selectedBones, setSelectedBones] = useState([]);
  const [chamsColor, setChamsColor] = useState('#4facfe');
  const [sensitivity, setSensitivity] = useState(1.0);
  const [configName, setConfigName] = useState('');
  const [configs, setConfigs] = useState([]);

  const config = new Config('NOVAHACK');

  useEffect(() => {
    // Load initial settings
    setAimbotEnabled(config.getSetting('Enable Aimbot', false));
    setFov(config.getSetting('FOV', 90));
    setSmoothing(config.getSetting('Smoothing', 50));
    setSelectedBones(config.getSetting('Target Bones', []));
    setChamsColor(config.getSetting('Chams Color', '#4facfe'));
    setSensitivity(config.getSetting('Sensitivity', 1.0));
  }, []);

  useEffect(() => {
    setConfigs(config.getAllConfigs());
  }, []);

  // Save settings when they change
  useEffect(() => {
    config.setSetting('Enable Aimbot', aimbotEnabled);
    config.setSetting('FOV', fov);
    config.setSetting('Smoothing', smoothing);
    config.setSetting('Target Bones', selectedBones);
    config.setSetting('Chams Color', chamsColor);
    config.setSetting('Sensitivity', sensitivity);
  }, [aimbotEnabled, fov, smoothing, selectedBones, chamsColor, sensitivity]);

  const handleSaveConfig = () => {
    if (configName.trim()) {
      config.saveAsConfig(configName.trim());
      setConfigs(config.getAllConfigs());
      setConfigName('');
    }
  };

  const handleLoadConfig = (name) => {
    if (config.loadSavedConfig(name)) {
      // Reload all settings
      setAimbotEnabled(config.getSetting('Enable Aimbot', false));
      setFov(config.getSetting('FOV', 90));
      setSmoothing(config.getSetting('Smoothing', 50));
      setSelectedBones(config.getSetting('Target Bones', []));
      setChamsColor(config.getSetting('Chams Color', '#4facfe'));
      setSensitivity(config.getSetting('Sensitivity', 1.0));
    }
  };

  const handleDeleteConfig = (name) => {
    config.deleteConfig(name);
    setConfigs(config.getAllConfigs());
  };

  const tabs = [
    { id: 'aimbot', icon: <FaCrosshairs />, label: 'Aimbot' },
    { id: 'visuals', icon: <MdVisibility />, label: 'Visuals' },
    { id: 'misc', icon: <IoSettings />, label: 'Misc' },
    { id: 'configs', icon: <VscFiles />, label: 'Configs' },
  ];

  const tooltips = {
    enableAimbot: "Automatically aims at enemies within your FOV",
    fov: "Field of View - The area in which targets will be detected",
    smoothing: "Higher values make aim movement more smooth and human-like"
  };

  const boneOptions = [
    { value: 'head', label: 'Head' },
    { value: 'neck', label: 'Neck' },
    { value: 'spine', label: 'Spine' },
    { value: 'pelvis', label: 'Pelvis' },
  ];

  return (
    <main className={styles.container}>
      <Window title={<><span className={styles.accent}>NOVA</span>HACK</>}>
        <TooltipProvider>
          <Tab tabs={tabs}>
            {(activeTab) => (
              <>
                {activeTab === 'aimbot' && (
                  <Section title="Aimbot Settings">
                    <Label>Quick Actions</Label>
                    <ButtonRow>
                      <Button>Button 1</Button>
                      <Button>Button 2</Button>
                    </ButtonRow>
                    
                    <Button>Button 3</Button>

                    <TooltipTrigger tooltip={tooltips.enableAimbot}>
                      <div className={styles.setting}>
                        <label>Enable Aimbot</label>
                        <Toggle
                          id="aimbot-toggle"
                          checked={aimbotEnabled}
                          onChange={(e) => setAimbotEnabled(e.target.checked)}
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipTrigger tooltip={tooltips.fov}>
                      <div className={styles.setting}>
                        <label>FOV</label>
                        <Slider
                          value={fov}
                          onChange={(e) => setFov(e.target.value)}
                          min={1}
                          max={180}
                          unit="°"
                          valueToPercent={(v) => ((v - 1) / 1.79)}
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipTrigger tooltip={tooltips.smoothing}>
                      <div className={styles.setting}>
                        <label>Smoothing</label>
                        <Slider
                          value={smoothing}
                          onChange={(e) => setSmoothing(e.target.value)}
                          min={1}
                          max={100}
                          unit="%"
                        />
                      </div>
                    </TooltipTrigger>
                    <div className={styles.setting}>
                      <label>Target Bones</label>
                      <Dropdown
                        options={boneOptions}
                        value={selectedBones}
                        onChange={setSelectedBones}
                        multiple={true}
                        placeholder="Select bones"
                      />
                    </div>
                    <div className={styles.setting}>
                      <label>Chams Color</label>
                      <ColorPicker
                        value={chamsColor}
                        onChange={setChamsColor}
                      />
                    </div>
                    <div className={styles.setting}>
                      <label>Sensitivity</label>
                      <Input
                        type="number"
                        value={sensitivity}
                        onChange={setSensitivity}
                        min={0.1}
                        max={10}
                        step={0.1}
                      />
                    </div>
                  </Section>
                )}
                {activeTab === 'configs' && (
                  <Section title="Configs">
                    <div className={styles.setting}>
                      <Input
                        value={configName}
                        onChange={setConfigName}
                        placeholder="Config name"
                      />
                      <button
                        className={styles.button}
                        onClick={handleSaveConfig}
                        disabled={!configName.trim()}
                      >
                        Save Current Settings
                      </button>
                    </div>
                    <List
                      items={configs}
                      onSelect={handleLoadConfig}
                      onDelete={handleDeleteConfig}
                    />
                  </Section>
                )}
              </>
            )}
          </Tab>
        </TooltipProvider>
      </Window>
    </main>
  );
}