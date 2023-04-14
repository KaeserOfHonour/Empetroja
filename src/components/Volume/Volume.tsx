import { faVolumeHigh, faVolumeLow, faVolumeOff, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import VolumeStyles from "./Volume.module.scss";

const Volume: React.FC = () => {
    const [volume, setVolume] = useState(50);
    const [muted, setMuted] = useState(false);
    const volumeRef = useRef<HTMLInputElement>(null);
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(Number(e.currentTarget.value));
        setMuted(false);
        if (volumeRef.current) {
            volumeRef.current.style.setProperty("--value", `${e.currentTarget.value}`);
        }
    };
    const iconClick = () => {
        setVolume(volume ? 0 : 50);
        setMuted(!!volume);
        if (volumeRef.current) {
            volumeRef.current.style.setProperty("--value", `${volume ? 0 : 50}`);
        }
    };
    const icon = volume === 0 ? faVolumeOff : volume < 50 ? faVolumeLow : faVolumeHigh;
    const mutedIcon = muted ? faVolumeXmark : icon;
    return (
        <div className={VolumeStyles.volume}>
            <div>
                <FontAwesomeIcon icon={mutedIcon} onClick={iconClick} />
            </div>
            <input
                type="range"
                ref={volumeRef}
                min={0}
                max={100}
                value={volume}
                className={VolumeStyles.volume_bar}
                onChange={handleVolumeChange}
            />
        </div>
    );
};
export default Volume;