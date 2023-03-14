import Head from "next/head";
import Image from "next/image";
import styles from "../breed/SingleBreed.module.css";
import Header from "@/components/header/header";
import Link from "next/link";

type Breed = {
  name: string;
  id: string;
  picture: string;
  breeds: any;
};

export default function CategoryPage(breed: Breed) {
  const singleBreed = Object.keys(breed).map((key) => {
    return { [key]: breed[key as keyof typeof breed] };
  });

  const short = singleBreed[0].breed[0].breeds[0];

  return (
    <>
      <Head>
        <title>{short.name}</title>
      </Head>
      <main className={styles.main}>
        <Header />
        <Link href={"/"}>go back</Link>
        <section className={styles.breedSection}>
          <div className={styles.breedWrapper}>
            <div className={styles.breedTextContainer}>
              <h1>{short.name}</h1>
              <p>{short.description}</p>
            </div>

            {singleBreed[0].breed.map((image: any) => {
              return (
                <div
                  className={styles.breedSingleImageContainer}
                  key={image.id}
                >
                  <Image
                    key={image.id}
                    width={image.width}
                    height={image.height}
                    alt="test"
                    src={image.url}
                  ></Image>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps(context: {
  query: { singleBreed: any };
}) {
  const breedID = context.query.singleBreed;

  let url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedID}&limit=5&api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  return {
    props: {
      breed: data,
    },
  };
}
