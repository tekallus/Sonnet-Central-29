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
    // useEffect içinde, searchInput değeri değiştiğinde çalışacak kodları tanımlayalım

    // 1. sonnetsData dizisini filtreleme
    const results = sonnetsData.filter((sonnet) =>
      // 2. Her bir sonnet'in lines dizisinde dolaşma
      sonnet.lines.some((line) =>
        // 3. Satırdaki her kelimeyi ayırarak küçük harfe çevirme
        line
          .toLowerCase()
          .split(' ')
          .some(
            (word) => word.toLowerCase() === searchInput.toLowerCase() // Tam kelime eşleşmesi kontrolü
          )
      )
    )

    // 5. Elde edilen sonuçları setSearchResults fonksiyonu ile searchResults state'ine set etme
    setSearchResults(results)
  }, [searchInput])

  const sonnetsContent =
    searchInput === '' ? ( // Eğer arama yapılmamışsa her sonnet bir div icinde h3 ile sonnet basligi ve her satiri <p> olacak sekilde ayarlayalim
      sonnetsData.map(
        (
          sonnet
          //ile her bir sonnet için bir <div> oluşturalim
        ) => (
          <div key={sonnet.number} className="sonnet">
            <h3>Sonnet {sonnet.number}</h3>
            {sonnet.lines.map(
              (
                line,
                lineIndex //ile her bir satır için bir <p> oluşturma
              ) => (
                <p key={lineIndex}>{line}</p>
              )
            )}
          </div>
        )
      )
    ) : searchResults.length > 0 ? ( // eger arama sonuclari varsa
      searchResults.map(
        (
          sonnet
          //bulunan sonentlere div olusturalim
        ) => (
          // searchResults içindeki her bir sonnet için döngü
          <div key={sonnet.number} className="sonnet">
            {/* Her bir sonnetin başlığını gösterme */}
            <h3>Sonnet {sonnet.number}</h3>
            {/* Her bir sonnetin satırları üzerinde döngü */}
            {sonnet.lines.map((line, lineIndex) => (
              //  her bir satır için bir <p> oluşturulur.
              <p key={lineIndex}>
                {/* Her bir satırdaki kelimeler üzerinde döngü */}
                {line.split(' ').map((word, wordIndex) =>
                  word.toLowerCase().includes(searchInput.toLowerCase()) ? (
                    //ile her kelime için bir <span> oluşturulur. Eğer kelime arama terimini içeriyorsa, bu kelime <span> içinde highlighted-word sınıfıyla vurgulanır.
                    <span key={wordIndex} className="highlighted-word">
                      {word}{' '}
                    </span>
                  ) : (
                    // Eğer kelime arama terimini içermiyorsa, normal olarak göster

                    <span key={wordIndex}>{word} </span>
                  )
                )}
              </p>
            ))}
          </div>
        )
      )
    ) : (
      // 1.eger Arama sonuçları yoksa mesajı gösterme

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
