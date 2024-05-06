import { useEffect, useState } from 'react'

const CAT_ENDPOINT_PREFIX_IMAGE_URL = 'https://cataas.com'

export function useCatImage ({ fact }: { fact: string }) {
  const [imageUrl, setImageUrl] = useState<string>('')
  const [imageAlt, setImageAlt] = useState<string>('')

  useEffect(() => {
    if (fact && fact !== '') {
      const firstWord = fact.split(' ', 1)

      fetch(`${CAT_ENDPOINT_PREFIX_IMAGE_URL}/cat/says/${firstWord}?fontSize=50&fontColor=red&json=true`)
        .then(res => res.json())
        .then(response => {
          const { _id } = response
          setImageUrl(`${CAT_ENDPOINT_PREFIX_IMAGE_URL}/cat/${_id}/says/${firstWord}`)
          setImageAlt(`Image of a cat with the word ${firstWord}`)
        })
    }

    return () => {
      setImageUrl('')
    }
  }, [fact])

  return { imageUrl, imageAlt }
}