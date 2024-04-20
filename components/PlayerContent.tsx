"use client";

import useSound from "use-sound";
import { useEffect, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";

import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";

import LikeButton from "./LikeButton";
import MediaItem from "./MediaItem";
import Slider from "./Slider";


interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ 
  song, 
  songUrl
}) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [seekbarValue, setSeekbarValue] = useState(0);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  }

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  }

  const [play, { pause, sound }] = useSound(
    songUrl,
    { 
      volume: volume,
      onplay: () => setIsPlaying(true),
      onend: () => {
        setIsPlaying(false);
        onPlayNext();
      },
      onpause: () => setIsPlaying(false),
      format: ['mp3']
    }
  );

  useEffect(() => {
    sound?.play();
    
    return () => {
      sound?.unload();
    }
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  }

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  }
  useEffect(() => {
    const updateSeekbar = () => {
      if (sound) {
        const progress = (sound.seek() || 0) / sound.duration();
        setSeekbarValue(progress);
      }
    };

    const seekbarInterval = setInterval(updateSeekbar, 1000);

    return () => {
      clearInterval(seekbarInterval);
    };
  }, [sound]);

  const handleSeekbarChange = (value: number) => {
    if (sound) {
      const newPosition = value * sound.duration();
      sound.seek(newPosition);
    }
  };

  return ( 
    <div className="grid grid-cols-3 md:grid-cols-3 h-full">
        <div className="flex w-full justify-start">
          <div className="flex items-center gap-x-4">
            <MediaItem data={song} />
            <LikeButton songId={song.id} />
          </div>
        </div>

        <div 
          className="
            flex 
            md:hidden 
            col-auto 
            w-full 
            justify-end 
            items-center
            
          "
        >
          <div 
            onClick={handlePlay} 
            className="
              h-8
              w-8
              
              flex 
              items-center 
              justify-center 
              rounded-full 
              bg-white
              mr-2 
              p-1 
              cursor-pointer
            "
          >
            <Icon size={30} className="text-black" />
          </div>
        </div>
        <div>
        <div 
          className="
            hidden
            h-9
            md:flex 
            justify-center 
            items-center 
            w-full 
            max-w-[722px] 
            gap-x-6
            
            
            
            
            
          "
        >
          <AiFillStepBackward
            onClick={onPlayPrevious}
            size={30} 
            className="
              text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition
              
            "
          />
          <div 
            onClick={handlePlay} 
            className="
              flex 
              items-center 
              justify-center
              h-10
              w-10
              
              rounded-full 
              bg-neutral-100 
              p-1 
              cursor-pointer
              
            "
          >
            <Icon size={30} className="text-black" />
            
          
          </div>
          
          <AiFillStepForward
            onClick={onPlayNext}
            size={30} 
            className="
              text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition
              
            " 
          />
        </div>
        <div
          className=" h-4 mt-6  flex justify-center items-center  cursor-pointer sm:mt-6 md:mt-2 ">
            <Slider 
              value={seekbarValue} 
              onChange={handleSeekbarChange} 
              
/> 
        </div>
        </div>
        

        <div className=" md:flex w-full justify-end pr-2">
          <div className="flex items-center gap-x-2 w-[120px]">
            <VolumeIcon 
              onClick={toggleMute} 
              className="cursor-pointer" 
              size={34} 
            />
            <Slider 
              value={volume} 
              onChange={(value) => setVolume(value)}
            />
          </div>
        </div>

      </div>
   );
}
 
export default PlayerContent;

