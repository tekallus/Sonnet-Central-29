import { useState, useRef, useEffect } from 'react'
import sonnetsData from './data/sonnetsData'
import Header from './components/Header'
import './styles.css'
export default function App() {
  const inputRef = useRef()
  const [searchInput, setSearchInput] = useState('')
  const [searchResults, setSearchResults] = useState([]) // Yeni state for search results

  function handleClick() {
    setSearchInput(inputRef.current.value.trim())
  }

  //Kullanıcının girdiği metni içeren sonetleri bulmak ve bu sonetleri göstermek bir yan etkidir.
  // bu yuzden kullanici arama kutusuna yeni bir metin girdiginde calisacak fonksiyon useEffect(() => {}
  //useEffect sayesinde, searchInput state'i değiştiğinde, yani kullanıcı bir şeyler yazıp arama butonuna tıkladığında çalışacak olan kodları tanımlayabiliriz.
  //filter ile sonnetsData dizisinde dolaşarak her bir sonetin satırlarını kontrol edelim
  //ve arama metnini içeren sonetleri searchResults adlı bir state içine yerleştirdi
  useEffect(() => {
    //// useEffect içinde, searchInput değeri değiştiğinde çalışacak kodları tanımlayalim

    const results = sonnetsData.filter((sonnet) =>
      sonnet.lines.some(
        (line) =>
          line
            .toLowerCase() // satırı küçük harfe çevir
            .includes(searchInput.toLowerCase()) // arama terimini küçük harfe çevir ve içerip içermediğini kontrol et
      )
    )
    setSearchResults(results)
  }, [searchInput])

  const sonnetsContent =
    searchResults.length > 0 ? (
      searchResults.map((sonnet, index) => (
        <div key={index} className="sonnet">
          <h3>Sonnet {sonnet.number}</h3>
          {sonnet.lines.map((line, lineIndex) => (
            // 2.1. Arama sonuçları varsa, sadece arama terimini içeren kelimeleri vurgula
            <p key={lineIndex}>
              {line.split(' ').map((word, wordIndex) =>
                word.toLowerCase().includes(searchInput.toLowerCase()) ? (
                  <span key={wordIndex} className="highlighted-word">
                    {word}{' '}
                  </span>
                ) : (
                  <span key={wordIndex}>{word} </span>
                )
              )}
            </p>
          ))}
        </div>
      ))
    ) : (
      // 1. Arama sonuçları yoksa mesajı gösterme

      <p className="no-results-message">
        Alas, thy search hath yielded no results
      </p>
    )

  return (
    <div className="wrapper">
      <Header searchProps={{ inputRef, handleClick }} />

      <div className="sonnets-container">{sonnetsContent}</div>
    </div>
  )
}
