import Image from "next/image";
import Link from "next/link";
import styles from "../breeds/Breed.module.css";

type Breed = {
  name: string;
  id: string;
  picture: string;
};

export default function Breeds(props: Breed) {
  return (
    <>
      <Link className={styles.breedContainer} href={`/breed/${props.id}`}>
        <p>{props.name}</p>
        <Image
          width="500"
          height="500"
          alt={props.name}
          src={props.picture}
        ></Image>
      </Link>
    </>
  );
}
