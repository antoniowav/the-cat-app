import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import { GetServerSideProps } from "next";
import Breeds from "../components/breeds/breeds";
import Header from "@/components/header/header";
import { Menu } from "@headlessui/react";
import { BsChevronDown } from "react-icons/bs";

type Props = {
  categoriesId: {
    name: string;
    description: string;
    picture: string;
    id: string;
  };
  breeds: {
    name: string;
    id: string;
  };
};

export default function Home({ breeds, categoriesId }: Props) {
  const breed = Object.keys(breeds).map((key) => {
    return { [key]: breeds[key as keyof typeof breeds] };
  });

  const catId = Object.keys(categoriesId).map((key) => {
    return { [key]: categoriesId[key as keyof typeof categoriesId] };
  });

  return (
    <>
      <Head>
        <title>Cat App</title>
        <meta
          name="description"
          content="Cat app that fetch cat breeds from the cat API"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Header />
        <div className={styles.filterButtonContainer}>
          <Menu as="div">
            <Menu.Button className={styles.filterButton}>
              Filter
              <BsChevronDown />
            </Menu.Button>
            <Menu.Items className={styles.filterItems}>
              {catId.map((cat: any, index: number) => {
                return (
                  <Menu.Item key={cat[index].id}>
                    <Link
                      href={`/category/${cat[index].id}`}
                      key={cat[index].id}
                    >
                      {cat[index].name}
                    </Link>
                  </Menu.Item>
                );
              })}
            </Menu.Items>
          </Menu>
        </div>

        <section className={styles.section}>
          {breed.map((b: any, index: number) => (
            <Breeds
              key={index}
              id={b[index].id}
              name={b[index].name}
              picture={b[index].image.url}
            />
          ))}
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  let urlBreeds = `https://api.thecatapi.com/v1/breeds?limit=12&api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
  let urlCategoriesId = `https://api.thecatapi.com/v1/categories?limit=12&api_key=${process.env.NEXT_PUBLIC_API_KEY}`;

  const categoriesId = await fetch(urlCategoriesId);
  const breeds = await fetch(urlBreeds);

  const catId = await categoriesId.json();
  const bre = await breeds.json();

  return {
    props: {
      breeds: bre,
      categoriesId: catId,
    },
  };
}
