import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import api from '../../services/api';
import './filme-info.css'

function Filme() {

    const { id } = useParams();  //pega o ID do filme selecionado
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "403bbbb76def6431060b7afed07db398",
                    language: 'pt-BR'
                }
            })
                .then((response) => {
                    setFilme(response.data);
                    setLoading(false);
                })
                .catch(() => {
                    navigate("/", { replace: true});  //se não encontrar o filme, 
                    //leva para a tela inicial
                    return;
                })
        }

        loadFilme();
        return () => {

        }
    }, [navigate, id])

    function salvarFilme() {
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];  //tenta buscar a lista, se não tiver nada cria um array vazio

        const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id);  //verifica se pelo menos um item da lista e igual
    
    if (hasFilme) {
        toast.warn("Este filme já está na sua lista!");
        return;
    } 

    filmesSalvos.push(filme); //adiciona ao array o filme
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo com sucesso!");
    }

    if (loading) {
        return (
            <div className='filme-info'>
                Carregando detalhes do filme...
            </div>
        )
    }

    return (
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliação: {filme.vote_average}/10</strong>

            <div className="area-buttons">
                <button
                onClick={salvarFilme}
                >Salvar</button>
                <button>
                <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer
                </a>
                </button>
            </div>
        </div>
    )
}

export default Filme;