import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { DollarSign, Home, TrendingUp, Target, Wallet, Cog, Percent, BarChart3, Instagram, Linkedin, Facebook } from 'lucide-react';
import { Youtube } from 'lucide-react';
import heroBackground from '@/assets/Porto Belo Redime.jpg';
import fabricioPavesi from '@/assets/img-fb.png';
import fabricioPavesiReal from '@/assets/img-fb.png';
import ariLogo from '@/assets/lgpreto-removecort.png'; // Importe sua imagem de logo aqui
const LandingPage = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    valor_investimento: '' // Adicione esta linha
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    toast
  } = useToast();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    if (name === 'whatsapp') {
      let newValue = value;
      if (!newValue.startsWith('+55')) {
        newValue = '+55' + value.replace(/^\+55/, '');
      }
      setFormData(prev => ({
        ...prev,
        [name]: newValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!formData.nome || !formData.email || !formData.whatsapp || formData.whatsapp === '+55' || formData.whatsapp === '') {
    toast({
      title: "Erro",
      description: "Por favor, preencha todos os campos obrigatórios.",
      variant: "destructive"
    });
    return;
  }
  setIsSubmitting(true);
  try {
    // Primeiro webhook
    const response1 = await fetch('https://n8nwebhook.arck1pro.shop/webhook/lp-rd', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    // Segundo webhook (novo)
    const response2 = await fetch('https://n8nwebhook.arck1pro.shop/webhook/lp-ari-rdstationcrm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response1.ok && response2.ok) {
      // Dispara o evento de conversão do Facebook Pixel (CompleteRegistration)
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'CompleteRegistration', {
          content_name: 'Cadastro ARI',
          status: 'completed'
        });
      }
      toast({
        title: "Sucesso!",
        description: "Cadastro realizado com sucesso. Redirecionando..."
      });
      setFormData({
        nome: '',
        email: '',
        whatsapp: '',
        valor_investimento: ''
      });

      // Redireciona após 1 segundo (garantindo que o Pixel seja disparado)
      setTimeout(() => {
        window.location.href = "https://obrigado.arck1pro.com.br/";
      }, 1000);
    } else {
      const errorText1 = await response1.text();
      const errorText2 = await response2.text();
      throw new Error(`Erro no webhook 1: ${errorText1} | Erro no webhook 2: ${errorText2}`);
    }
  } catch (error) {
    toast({
      title: "Erro",
      description: `Ocorreu um erro ao enviar o cadastro: ${error.message}. Tente novamente.`,
      variant: "destructive"
    });
  } finally {
    setIsSubmitting(false);
  }
};
  const scrollToForm = () => {
    document.getElementById('register-form')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section relative flex items-center justify-center min-h-screen px-2 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        <div className="hero-background" style={{
        backgroundImage: `url(${heroBackground})`
      }} />
        
        <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 xl:gap-12 items-center z-10 px-2 sm:px-4 lg:px-6">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-3 sm:space-y-4 lg:space-y-6 xl:space-y-8">
          {/* Logo/Brand */}
          <div className="space-y-1"> {/* Reduzi o espaçamento aqui */}
            <div className="super-live-badge inline-block px-2 sm:px-3 lg:px-4 xl:px-6 py-1 sm:py-2 rounded-full text-white text-xs sm:text-sm">
              🔴 SUPER LIVE
            </div>
          </div>
          
          {/* Logo ARI - Tamanho ajustado e espaçamento reduzido */}
          <div className="flex justify-center lg:justify-start mb-2"> {/* Reduzi o margin-bottom */}
            <img src={ariLogo} alt="ARI - Ativo de Renda Imobiliária" className="w-auto h-[100px] sm:h-[100px] md:h-[100px] lg:h-[100px] object-contain" />
          </div>

            {/* Main Title */}
            <h2 className="hero-title text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl text-left m-0">
            Conquiste retornos de até 3% ao mês livre de imposto de renda, com investimentos em ARI - Ativos de Renda Imobiliária no litoral de Santa Catarina.
          </h2>

            {/* Subtitle */}
            <p className="hero-subtitle text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl text-left">
              Participe do nosso evento online exclusivo e aprenda a fazer investimentos inteligentes e altamente rentáveis no crescente mercado imobiliário do Litoral Catarinense.{' '}
            </p>

            <div className="space-y-1">
              <p className="hero-subtitle text-xs sm:text-sm md:text-base lg:text-base xl:text-lg text-left">
                Descubra as estratégias dos investimentos ARI – Ativos de Renda Imobiliária para multiplicar seu patrimônio ou gerar rendimentos mensais em uma das regiões mais promissoras do Brasil.
              </p>
            </div>

            {/* Date Info */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:flex lg:flex-wrap justify-center lg:justify-start sm:gap-4 lg:gap-6 xl:gap-8 text-white text-sm sm:text-sm md:text-base">
              <div className="flex flex-col items-center lg:items-start gap-2 sm:gap-2">
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="text-lg sm:text-lg md:text-xl lg:text-xl xl:text-2xl">📅</span>
                  <span className="font-medium text-sm sm:text-sm lg:text-base"> 27 de agosto</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="text-lg sm:text-lg md:text-xl lg:text-xl xl:text-2xl">🕒</span>
                  <span className="font-medium text-sm sm:text-sm lg:text-base">19h (Horário de Brasília)</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="text-lg sm:text-lg md:text-xl lg:text-xl xl:text-2xl">💰</span>
                  <span className="font-medium text-sm sm:text-sm lg:text-base">100% gratuito</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="text-lg sm:text-lg md:text-xl lg:text-xl xl:text-2xl">💻</span>
                  <span className="font-medium text-sm sm:text-sm lg:text-base">Online e ao vivo</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Form */}
          <div className="flex justify-center lg:justify-end mt-4 sm:mt-6 lg:mt-0">
            <div className="backdrop-blur-lg border border-white/20 p-3 sm:p-4 md:p-6 lg:p-6 xl:p-8 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-xl bg-white/[0.71]">
              <h3 className="text-black text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-center mb-3 sm:mb-4 md:mb-6">Cadastre-se agora para garantir sua vaga!</h3>
              
              <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3 md:space-y-4" id="register-form">
                <div>
                <Input type="text" name="nome" placeholder="Nome*" value={formData.nome} onChange={handleInputChange} required className="w-full h-9 sm:h-10 md:h-12 px-2 sm:px-3 md:px-4 rounded-lg border-0 bg-white text-gray-900 placeholder:text-gray-500 text-xs sm:text-sm md:text-base" />
                </div>
  
                    <div>
                    <Input type="email" name="email" placeholder="Email*" value={formData.email} onChange={handleInputChange} required className="w-full h-9 sm:h-10 md:h-12 px-2 sm:px-3 md:px-4 rounded-lg border-0 bg-white text-gray-900 placeholder:text-gray-500 text-xs sm:text-sm md:text-base" />
                      </div>
  
                      <div>
                    <Input type="tel" name="whatsapp" placeholder="+55 DDD + Numero*" value={formData.whatsapp} onChange={handleInputChange} required className="w-full h-9 sm:h-10 md:h-12 px-2 sm:px-3 md:px-4 rounded-lg border-0 bg-white text-gray-900 placeholder:text-gray-500 text-xs sm:text-sm md:text-base" />
                      </div>

              {/* Novo campo adicionado aqui */}
                          <div>
                <select name="valor_investimento" value={formData.valor_investimento} onChange={handleInputChange} required className="w-full h-9 sm:h-10 md:h-12 px-2 sm:px-3 md:px-4 rounded-lg border-0 bg-white text-gray-900 placeholder:text-gray-500 text-xs sm:text-sm md:text-base">
      <option value="">Qual o valor inicial do seu investimento?*</option>
      <option value="Até 50 mil">Até 50 mil</option>
      <option value="50-100">De 50 mil a 100 mil</option>
      <option value="100-150">De 100 mil a 150 mil</option>
      <option value="150-200">De 150 mil a 200 mil</option>
      <option value="Acima de 200 mil">Acima de 200 mil</option>
    </select>
  </div>

  {/* Texto de consentimento */}
  <div className="text-xs text-gray-600 px-2">
    Ao preencher este formulário, autorizo que meus dados sejam utilizados para que a empresa entre em contato comigo por e-mail, telefone ou outros meios informados, com o objetivo de fornecer informações relacionadas aos produtos ou serviços de meu interesse.
  </div>
  
  <Button type="submit" disabled={isSubmitting} className="register-button w-full h-9 sm:h-10 md:h-12 text-white rounded-lg font-semibold text-xs sm:text-sm md:text-base">
    {isSubmitting ? 'ENVIANDO...' : 'QUERO ME REGISTRAR'}
  </Button>
            </form>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="py-8 sm:py-12 lg:py-16 xl:py-20 px-2 sm:px-4 bg-[fafafa] bg-zinc-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="section-title text-2xl sm:text-3xl lg:text-4xl text-center mb-8 sm:mb-12 lg:mb-16">O que você irá aprender na Super Live A R I?</h2>
          
          <p className="section-content text-center sm:text-xl lg:text-2xl mb-8 sm:mb-12 lg:mb-16 text-lg">Na Super Live ARI (Ativos de Renda Imobiliária), você vai desvendar o potencial do mercado imobiliário do Litoral Catarinense e aprender a transformar seu capital em investimentos de alta rentabilidade.</p>
          
          <div className="space-y-8 sm:space-y-10 lg:space-y-12">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start text-center sm:text-left">
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0 bg-[#400140]">
                <span className="text-white font-bold text-sm sm:text-base">1</span>
              </div>
              <div>
                <h3 className="section-title text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Desmistificando o mercado de ARI no litoral catarinense</h3>
                <p className="section-content sm:text-base text-justify text-base">Vamos desmistificar os investimentos em Ativos de Renda Imobiliária no Litoral Catarinense, apresentando as oportunidades e os desafios reais e únicos dessa região. 
Nosso objetivo é que você entenda a fundo a complexidade desse mercado, sem se sentir intimidado por termos técnicos ou burocracia. Prepare-se para conhecer o panorama completo dos ARI e como eles se encaixam na sua carteira de investimentos.</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start text-center sm:text-left">
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0 bg-[#400140]">
                <span className="text-white font-bold text-sm sm:text-base">2</span>
              </div>
              <div>
                <h3 className="section-title text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Estratégias para acesso e investimento em ARI</h3>
                <p className="section-content sm:text-base text-justify text-base">Você vai descobrir estratégias e modelos de negócio inovadores que possibilitam começar a investir em incorporações no Litoral Catarinense, focando em ARI, sem a necessidade de um alto capital inicial podendo investir a partir de R$ 50 mil. 
Nosso foco é te mostrar como ter acesso aos melhores e mais promissores projetos imobiliários da região, tornando o investimento em Ativos de Renda Imobiliária uma realidade ao seu alcance.
              </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start text-center sm:text-left">
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0 bg-[#400140]">
                <span className="text-white font-bold text-sm sm:text-base">3</span>
              </div>
              <div>
                <h3 className="section-title text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Maximizando seus retornos com ARI</h3>
                <p className="section-content sm:text-base text-justify text-base">Você saberá como alcançar até 3% de retorno ao mês nos seus investimentos em ARI, livre de Imposto de Renda. 
Vamos te guiar na identificação de oportunidades lucrativas e na proteção do seu capital a longo prazo, visando sua segurança financeira. 
Chega de ver seu dinheiro parado e perdendo valor para a inflação. Com os Ativos de Renda Imobiliária, seu capital trabalhará para você!</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8 sm:mt-12">
            <Button onClick={scrollToForm} className="register-button px-6 sm:px-8 py-3 text-white rounded-lg font-semibold text-sm sm:text-base">
              QUERO APRENDER SOBRE ARI
            </Button>
          </div>
        </div>
      </section>

      {/* Who Can Participate Section */}
      <section className="py-8 sm:py-12 lg:py-16 xl:py-20 px-2 sm:px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="section-title text-2xl sm:text-3xl lg:text-4xl text-center mb-8 sm:mb-12 lg:mb-16">Para quem é a Super Live ARI – Ativos de Renda Imobiliária</h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center space-y-4 sm:space-y-6">
              <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-full flex items-center justify-center mx-auto bg-[#400140]">
                <DollarSign className="text-white w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <h3 className="section-title text-lg sm:text-xl font-semibold px-2">Investidor com capital disponível partir de R$ 50 mil</h3>
              <p className="section-content sm:text-base text-justify text-base">Se você pensa que só é possível investir em imóveis com milhões ou que os investimentos tradicionais não rendem bem, esta Super Live ARI é para você. Vamos te mostrar como entrar em um mercado conhecido pelo alto retorno com um investimento inicial a partir de R$ 50 mil, abrindo portas para oportunidades que antes pareciam distantes.</p>
            </div>
            
            <div className="text-center space-y-4 sm:space-y-6">
              <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-full flex items-center justify-center mx-auto bg-[#400140]">
                <Home className="text-white w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <h3 className="section-title text-lg sm:text-xl font-semibold px-2">Investidores iniciantes no setor imobiliário</h3>
              <p className="section-content sm:text-base text-justify text-base">Se você quer investir e alcançar seus objetivos financeiros, mas está receoso ou acredita que o mercado imobiliário é para poucos, esta Super Live ARI é perfeita para você. Iremos te guiar passo a passo para acessar oportunidades lucrativas no Litoral Catarinense, mostrando que investir em ARI é mais acessível e seguro do que você imagina.</p>
            </div>
            
            <div className="text-center space-y-4 sm:space-y-6 sm:col-span-2 lg:col-span-1">
              <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-full flex items-center justify-center mx-auto bg-[#400140]">
                <TrendingUp className="text-white w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <h3 className="section-title text-lg sm:text-xl font-semibold px-2">Investidores em busca de diversificação</h3>
              <p className="section-content sm:text-base text-justify text-base">Participe da Super Live para aprender a diversificar seu portfólio no aquecido setor imobiliário do Litoral Catarinense de forma inteligente e flexível. Descubra como investir com aportes a partir de R$ 50 mil e gerar rendimentos imediatamente, sem a necessidade de revender ou administrar imóveis. É a chance de potencializar seus ganhos e proteger seu patrimônio.</p>
            </div>
          </div>
          
          <div className="text-center mt-8 sm:mt-12">
            <Button onClick={scrollToForm} className="register-button px-6 sm:px-8 py-3 text-white rounded-lg font-semibold text-sm sm:text-base">
              QUERO PARTICIPAR DA SUPER LIVE ARI
            </Button>
          </div>
        </div>
      </section>


      {/* What ARI Is Not Section */}
      <section className="py-8 sm:py-12 lg:py-16 xl:py-20 px-2 sm:px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="section-title text-2xl sm:text-3xl lg:text-4xl text-center mb-8 sm:mb-12 lg:mb-16">ARI – Ativo de Renda Imobiliária não é:</h2>
          
          <div className="grid gap-4 sm:gap-6 max-w-4xl mx-auto">
            <div className="flex gap-3 sm:gap-4 items-start">
              <div className="w-2 h-2 rounded-full bg-[#400140] mt-2 flex-shrink-0"></div>
              <p className="section-content sm:text-lg text-base"><strong>Venda de Cursos Milagrosos:</strong> Não prometemos atalhos ou fórmulas de enriquecimento rápido.</p>
            </div>
            
            <div className="flex gap-3 sm:gap-4 items-start">
              <div className="w-2 h-2 rounded-full bg-[#400140] mt-2 flex-shrink-0"></div>
              <p className="section-content sm:text-lg text-base"><strong>Venda de Imóveis:</strong> Apesar de sermos também imobiliária a ARI não se trata da venda de imóveis.</p>
            </div>
            
            <div className="flex gap-3 sm:gap-4 items-start">
              <div className="w-2 h-2 rounded-full bg-[#400140] mt-2 flex-shrink-0"></div>
              <p className="section-content sm:text-lg text-base"><strong>Banco, Corretora ou Gestora de Fundos:</strong> Não somos uma instituição financeira tradicional que guarda ou gerencia seu dinheiro diretamente.</p>
            </div>
            
            <div className="flex gap-3 sm:gap-4 items-start">
              <div className="w-2 h-2 rounded-full bg-[#400140] mt-2 flex-shrink-0"></div>
              <p className="section-content sm:text-lg text-base"><strong>Consultoria Genérica ou "Achismos":</strong> Não oferecemos conselhos sem fundamento ou sem base em análise profunda.</p>
            </div>
            
            <div className="flex gap-3 sm:gap-4 items-start">
              <div className="w-2 h-2 rounded-full bg-[#400140] mt-2 flex-shrink-0"></div>
              <p className="section-content sm:text-lg text-base"><strong>Serviço de "Trade" ou Day Trade:</strong> Não somos focados em operações de curto prazo ou especulação diária.</p>
            </div>
            
            <div className="flex gap-3 sm:gap-4 items-start">
              <div className="w-2 h-2 rounded-full bg-[#400140] mt-2 flex-shrink-0"></div>
              <p className="section-content sm:text-lg text-base"><strong>Assessoria Exclusiva para Ricos:</strong> Nossos serviços são pensados para diferentes perfis e estágios financeiros.</p>
            </div>
          </div>
          <div className="text-center mt-8 sm:mt-12">
            <Button onClick={scrollToForm} className="register-button px-6 sm:px-8 py-3 text-white rounded-lg font-semibold text-sm sm:text-base">QUERO ME REGISTRAR</Button>
          </div>
        </div>
      </section>

      {/* Why Invest With Us Section */}
    <section style={{
      backgroundColor: 'hsl(var(--section-background))'
    }} className="py-8 sm:py-12 lg:py-16 xl:py-20 px-2 sm:px-4 bg-white">
    <div className="container mx-auto max-w-6xl">
      <h2 className="section-title text-2xl sm:text-3xl lg:text-4xl text-center mb-8 sm:mb-12 lg:mb-16">Por que investir em ARI no litoral catarinense?</h2>
      
      {/* Primeira linha com 3 colunas */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 mb-8 lg:mb-12">
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full flex items-center justify-center mx-auto bg-[#400140]">
            <DollarSign className="text-white w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <h3 className="section-title text-base sm:text-lg font-semibold px-2">Acessibilidade e alto retorno</h3>
          <p className="section-content sm:text-sm text-justify text-base">Com os ARI, você tem acesso a investimentos de alto retorno investindo a partir de apenas R$ 50 mil. Isso democratiza o mercado imobiliário, permitindo que mais pessoas aproveitem as oportunidades de crescimento e valorização que antes eram exclusivas para grandes investidores</p>
        </div>
        
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full flex items-center justify-center mx-auto bg-[#400140]">
            <Percent className="text-white w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <h3 className="section-title text-base sm:text-lg font-semibold px-2">Rentabilidade excepcional e proteção financeira</h3>
          <p className="section-content sm:text-sm text-justify text-base">Imagine alcançar até 3% de rentabilidade ao mês, livre de imposto de renda! Com os ARI, essa é uma realidade tangível. Seu dinheiro não fica parado; ele trabalha para você, superando a inflação e garantindo um crescimento exponencial do seu patrimônio. Essa performance é um diferencial que posiciona os ARI como uma escolha inteligente para quem busca maximizar ganhos.</p>
        </div>
        
        <div className="text-center space-y-3 sm:space-y-4 md:col-span-2 xl:col-span-1">
          <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full flex items-center justify-center mx-auto bg-[#400140]">
            <BarChart3 className="text-white w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <h3 className="section-title text-base sm:text-lg font-semibold px-2">Segurança e crescimento em um mercado consolidado</h3>
          <p className="section-content sm:text-sm text-justify text-base">O Litoral Catarinense é um mercado em alta, com uma valorização imobiliária comprovada e contínua. Isso significa que seus investimentos em ARI estão ancorados em uma região de forte demanda e crescimento constante, oferecendo uma camada extra de segurança e estabilidade. A solidez do mercado local minimiza riscos e potencializa a valorização do seu capital a longo prazo.</p>
        </div>
      </div>
      
      {/* Segunda linha com 3 colunas */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full flex items-center justify-center mx-auto bg-[#400140]">
            <Target className="text-white w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <h3 className="section-title text-base sm:text-lg font-semibold px-2">Expertise e gestão completa para sua tranquilidade</h3>
          <p className="section-content sm:text-sm text-base text-justify">Nós cuidamos de tudo para você. Com nossa expertise e gestão completa dos seus investimentos imobiliários em ARI, você não precisa se preocupar com a burocracia ou a complexidade do mercado. Nossa equipe de especialistas gerencia cada etapa, desde a seleção das melhores oportunidades até a administração dos ativos, garantindo que seus investimentos sejam otimizados e seguros, liberando você para focar no que realmente importa.</p>
        </div>
        
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full flex items-center justify-center mx-auto bg-[#400140]">
            <Cog className="text-white w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <h3 className="section-title text-base sm:text-lg font-semibold px-2">Planos de investimento flexíveis para você</h3>
          <p className="section-content sm:text-sm text-justify text-base">Oferecemos planos de investimento em Ativos de Renda Imobiliária (ARI) flexíveis, pensados para se adequar aos seus objetivos financeiros e prazos de retorno: você pode escolher entre opções de 18, 24 ou 36 meses. Escolha o plano que melhor se alinha à sua estratégia e comece a construir um futuro financeiro mais sólido com os ARI!</p>
        </div>

        <div className="text-center space-y-3 sm:space-y-4">
          <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full flex items-center justify-center mx-auto bg-[#400140]">
            <Wallet className="text-white w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <h3 className="section-title text-base sm:text-lg font-semibold px-2">Flexibilidade financeira: rendimentos ARI no seu tempo</h3>
          <p className="section-content sm:text-sm text-justify text-base">Para sua maior conveniência e estratégia, seus investimentos em Ativos de Renda Imobiliária (ARI) podem gerar rendimento de duas formas: você pode optar por receber pagamentos mensalmente, proporcionando um fluxo de caixa contínuo, ou escolher ter o rendimento total ao final da operação, acumulando os ganhos para um retorno maior. Essa flexibilidade permite que você alinhe a forma de recebimento à sua necessidade de liquidez e aos seus objetivos financeiros.</p>
        </div>
      </div>
      
      <div className="text-center mt-8 sm:mt-12">
        <Button onClick={scrollToForm} className="register-button px-6 sm:px-8 py-3 text-white rounded-lg font-semibold text-sm sm:text-base">
          QUERO ME REGISTRAR
        </Button>
      </div>
    </div>
    </section>

      {/* ARCK1PRO Section */}
    <section className="py-8 sm:py-12 lg:py-16 xl:py-20 px-4 sm:px-6 bg-white">
  <div className="container mx-auto max-w-6xl">
    <h2 className="section-title text-2xl sm:text-3xl lg:text-4xl text-center mb-8 sm:mb-12 lg:mb-16">
      Quem organiza a Super Live ARI – Ativo de Renda Imobiliária?
    </h2>
    
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-0 items-start">
        {/* Mobile: Logo below title, Company name above social media */}
        <div className="lg:hidden flex flex-col items-center space-y-4 px-4">
          <div className="w-48 h-48 sm:w-56 sm:h-56 bg-white flex items-center justify-center">
            <img src="/lovable-uploads/arck_fundo_branco.png" alt="ARCK1PRO Logo" className="w-auto h-full object-contain" />
          </div>
          
          {/* Social Media Links for mobile - Aproximadas da imagem */}
          <div className="flex flex-col gap-3 w-full max-w-sm mt-2"> {/* Adicionado mt-2 para aproximar */}
            <a href="https://www.instagram.com/arck1pro/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#400140] px-4 py-3 rounded-full hover:bg-[#000000] transition-colors">
              <Instagram className="text-white w-4 h-4" />
              <span className="text-white text-sm font-medium">@arck1pro</span>
            </a>
            <a href="https://www.facebook.com/arck1pro" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#400140] px-4 py-3 rounded-full hover:bg-[#000000] transition-colors">
              <Facebook className="text-white w-4 h-4" />
              <span className="text-white text-sm font-medium">@arck1pro</span>
            </a>
          </div>
          
          <h3 className="section-title text-xl sm:text-2xl font-bold text-center mt-4"> {/* Adicionado mt-4 para alinhamento */}
            ARCK1PRO: Seu Parceiro Estratégico no Mercado Imobiliário do Litoral Catarinense
          </h3>
          
          <p className="section-content text-sm sm:text-base sm:text-justify px-2 text-justify mt-4"> {/* Adicionado mt-4 */}
            Na ARCK1PRO, somos especialistas em impulsionar o sucesso no dinâmico mercado imobiliário do Litoral Catarinense. Com uma atuação abrangente, oferecemos consultoria estratégica para incorporadores a INCORPHORE PRO, identificamos e negociamos as melhores áreas para desenvolvimento imobiliário e elaboramos projetos de empreendimentos que se destacam pela inovação e rentabilidade. Nossa missão é otimizar cada etapa do processo imobiliário, garantindo que nossos clientes incorporadores e investidores alcancem seus objetivos com segurança e excelência.
          </p>
        </div>
        
        {/* Desktop Layout */}
        <div className="hidden lg:flex lg:flex-col lg:items-center lg:pr-8"> {/* Adicionado lg:items-center para alinhar */}
          <div className="w-80 h-80 bg-white flex items-center justify-center mx-auto">
            <img src="/lovable-uploads/arck_fundo_branco.png" alt="ARCK1PRO Logo" className="w-auto h-full object-contain" />
          </div>

          {/* Social Media Links for desktop - Aproximadas da imagem */}
          <div className="flex flex-col items-center gap-3 mt-2 w-full"> {/* Alterado mt-4 para mt-2 */}
            <div className="flex justify-center w-full">
              <a href="https://www.instagram.com/arck1pro/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#400140] py-3 rounded-full hover:bg-[#000000] transition-colors mx-0 px-[88px]">
                <Instagram className="text-white w-4 h-4" />
                <span className="text-white text-sm font-medium">@arck1pro</span>
              </a>
            </div>

            <div className="flex justify-center w-full">
              <a href="https://www.facebook.com/arck1pro" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#400140] py-3 rounded-full hover:bg-[#000000] transition-colors mx-0 px-[88px]">
                <Facebook className="text-white w-4 h-4" />
                <span className="text-white text-sm font-medium">@arck1pro</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="hidden lg:block lg:pl-8">
          <h3 className="section-title text-2xl lg:text-3xl font-bold mb-6">
            ARCK1PRO: Seu Parceiro Estratégico no Mercado Imobiliário do Litoral Catarinense
          </h3>
          
          <p className="section-content text-base lg:text-lg text-justify mb-6">
            Na ARCK1PRO, somos especialistas em impulsionar o sucesso no dinâmico mercado imobiliário do Litoral Catarinense. Com uma atuação abrangente, oferecemos consultoria estratégica para incorporadores a INCORPHORE PRO, identificamos e negociamos as melhores áreas para desenvolvimento imobiliário e elaboramos projetos de empreendimentos que se destacam pela inovação e rentabilidade. Nossa missão é otimizar cada etapa do processo imobiliário, garantindo que nossos clientes incorporadores e investidores alcancem seus objetivos com segurança e excelência.
          </p>
        </div>
      </div>
    </div>
    <div className="text-center mt-12 sm:mt-16"> {/* Aumentado o mt para dar mais espaço ao botão */}
      <Button onClick={scrollToForm} className="register-button px-6 sm:px-8 py-3 text-white rounded-lg font-semibold text-sm sm:text-base">
        QUERO PARTICIPAR DA SUPER LIVE ARI
      </Button>
    </div>
  </div>
    </section>

      {/* About Organizer Section */}
      <section className="py-8 sm:py-12 lg:py-16 xl:py-20 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="section-title text-2xl sm:text-3xl lg:text-4xl text-center mb-8 sm:mb-12 lg:mb-16">
            Quem apresenta a Super Live A R I?
          </h2>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-0 items-start">
              {/* Mobile: Photo below title, Name above social media */}
              <div className="lg:hidden flex flex-col items-center space-y-3 px-4">
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden shadow-lg">
                  <img src={fabricioPavesiReal} alt="Fabrício Pavesi Junior" className="w-full h-full object-cover" />
                </div>
                
                {/* Social Media Links for mobile */}
                <div className="flex flex-col gap-3 w-full max-w-sm">
                  <a href="https://www.instagram.com/fabhricioari?igsh=YnR3emltYWpybmpi/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#400140] px-4 py-3 rounded-full hover:bg-[#000000] transition-colors">
                    <Instagram className="text-white w-4 h-4" />
                    <span className="text-white text-sm font-medium">@fabhricioari</span>
                  </a>
                  <a href="https://br.linkedin.com/in/arquitetofcsr" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#400140] px-4 py-3 rounded-full hover:bg-[#000000] transition-colors">
                    <Linkedin className="text-white w-4 h-4" />
                    <span className="text-white text-sm font-medium">@fabhricioari</span>
                  </a>
                  <a href="https://www.youtube.com/@arquitetofabriciopavesi" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#400140] px-4 py-3 rounded-full hover:bg-[#000000] transition-colors">
                    <Youtube className="text-white w-4 h-4" />
                    <span className="text-white text-sm font-medium">@arquitetofabriciopavesi</span>
                  </a>
                </div>
                
                <h3 className="section-title text-xl sm:text-2xl font-bold text-center">
                  Fabrício Pavesi Junior
                </h3>
                
                <p className="section-content text-sm sm:text-base sm:text-justify px-2 text-justify">
                  Hoje é diretor comercial de várias empresas no segmento imobiliário como a imobiliária Futurus, a incorporadora Harpaluus e a ARCKIPRO, onde gere uma equipe de mais de 20 profissionais entre eles, arquitetos, engenheiros, advogados e corretores que juntos inserem incorporadoras no mercado do litoral catarinense, com excelência e resultados.
                </p>
                
                {/* Credentials for mobile */}
                <div className="space-y-4 w-full px-2">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-lg font-bold mt-1 text-[#400140] flex-shrink-0">•</span>
                      <span className="section-content text-sm text-left">20 anos de atuação no segmento de Construção Civil</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-lg font-bold mt-1 text-[#400140] flex-shrink-0">•</span>
                      <span className="section-content text-sm text-left">+300 empreendimentos imobiliários desenvolvidos</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-lg font-bold mt-1 text-[#400140] flex-shrink-0">•</span>
                      <span className="section-content text-sm text-left">Especialista em Estruturação de Novos Negócios no Litoral Catarinense</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-lg font-bold mt-1 text-[#400140] flex-shrink-0">•</span>
                      <span className="section-content text-sm text-left">Pós-Graduado em Incorporação Imobiliária</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-lg font-bold mt-1 text-[#400140] flex-shrink-0">•</span>
                      <span className="section-content text-sm text-left">Arquiteto e Urbanista - CAU/SC 167832-9</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-lg font-bold mt-1 text-[#400140] flex-shrink-0">•</span>
                      <span className="section-content text-sm text-left">Pós-Graduado em Arquitetura de Luxo</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-lg font-bold mt-1 text-[#400140] flex-shrink-0">•</span>
                      <span className="section-content text-sm text-left">Pós-Graduado em Viabilidade de Empreendimentos</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop: Left side - Image and Social Media */}
              <div className="hidden lg:flex flex-col items-center order-1">
                <div className="w-64 h-64 xl:w-72 xl:h-72 rounded-full overflow-hidden shadow-lg mb-4">
                  <img src={fabricioPavesiReal} alt="Fabrício Pavesi Junior" className="w-full h-full object-cover" />
                </div>
                
                {/* Social Media Links for desktop */}
                <div className="flex flex-col gap-2 w-full max-w-xs">
                  <a href="https://www.instagram.com/fabhricioari?igsh=YnR3emltYWpybmpi/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#400140] px-4 py-3 rounded-full hover:bg-[#000000] transition-colors">
                    <Instagram className="text-white w-4 h-4" />
                    <span className="text-white text-sm font-medium">@fabhricioari</span>
                  </a>
                  <a href="https://br.linkedin.com/in/arquitetofcsr" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#400140] px-4 py-3 rounded-full hover:bg-[#000000] transition-colors">
                    <Linkedin className="text-white w-4 h-4" />
                    <span className="text-white text-sm font-medium">@fabhricioari</span>
                  </a>
                  <a href="https://www.youtube.com/@arquitetofabriciopavesi" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#400140] px-4 py-3 rounded-full hover:bg-[#000000] transition-colors">
                    <Youtube className="text-white w-4 h-4" />
                    <span className="text-white text-sm font-medium">@arquitetofabriciopavesi</span>
                  </a>
                </div>
                </div>
              
              {/* Desktop: Right side - Content and Credentials */}
              <div className="hidden lg:block space-y-2 order-2 pl-4">
                <h3 className="section-title text-3xl font-bold text-left">Fabhricio Ari</h3>
                
                <p className="section-content text-lg text-justify mb-10">Hoje é diretor comercial de várias empresas no segmento imobiliário como a imobiliária Futurus, a incorporadora Harpaluus e a ARCKIPRO, onde gere uma equipe de mais de 20 profissionais entre eles, arquitetos, engenheiros, advogados e corretores que juntos desenvolvem empreendimentos no mercado do litoral catarinense, com excelência e resultados.</p>
                
                <div className="h-6" />
                
                {/* Credentials for desktop */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 xl:gap-7">
                  <div className="space-y-7">
                    <div className="flex items-start gap-3">
                      <span className="text-lg font-bold mt-1 text-[#400140] flex-shrink-0">•</span>
                      <span className="section-content text-base text-left">20 anos de atuação no segmento de Construção Civil</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-lg font-bold mt-1 text-[#400140] flex-shrink-0">•</span>
                      <span className="section-content text-base text-left">+350 empreendimentos imobiliários desenvolvidos</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-lg font-bold mt-1 text-[#400140] flex-shrink-0">•</span>
                      <span className="section-content text-base text-left">Especialista em Estruturação de Novos Negócios no Litoral Catarinense</span>
                    </div>
                  </div>
                  
                  <div className="space-y-7">
                    <div className="flex items-start gap-3">
                      <span className="text-lg font-bold mt-1 text-[#400140] flex-shrink-0">•</span>
                      <span className="section-content text-base text-left">Pós-Graduado em Incorporação Imobiliária</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-lg font-bold mt-1 text-[#400140] flex-shrink-0">•</span>
                      <span className="section-content text-base text-left">Arquiteto e Urbanista - CAU/SC 167832-9</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-lg font-bold mt-1 text-[#400140] flex-shrink-0">•</span>
                      <span className="section-content text-base text-left">Pós-Graduado em Arquitetura de Luxo</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-lg font-bold mt-1 text-[#400140] flex-shrink-0">•</span>
                      <span className="section-content text-base text-left">Pós-Graduado em Viabilidade de Empreendimentos</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8 sm:mt-12">
            <Button onClick={scrollToForm} className="register-button px-6 sm:px-8 py-3 text-white rounded-lg font-semibold text-sm sm:text-base">
              QUERO ME REGISTRAR
            </Button>
          </div>
        </div>
      </section>

    {/* Why We Realize Super Live ARI Section */}
      <section className="py-8 sm:py-12 lg:py-16 xl:py-20 px-2 sm:px-4 bg-[fafafa] bg-zinc-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="section-title text-2xl sm:text-3xl lg:text-4xl text-center mb-8 sm:mb-12 lg:mb-16">Por que realizamos a Super Live ARI - Ativos de Renda Imobiliária?</h2>
          
          <div className="max-w-4xl mx-auto space-y-6 lg:space-y-8">
            <p className="section-content sm:text-lg leading-relaxed text-base text-justify">
              A Super Live ARI – Ativos de Renda Imobiliária nasceu do nosso compromisso em democratizar o acesso a investimentos imobiliários de alto rendimento. Percebemos que muitos investidores desejam entrar nesse mercado promissor, mas se sentem intimidados pela complexidade ou pela percepção de que é preciso um capital milionário.
            </p>
            
            <p className="section-content sm:text-lg leading-relaxed text-base text-justify">
              É por isso que eu e minha equipe da ARCK1PRO organizamos a Super Live ARI: para desmistificar os investimentos em ativos de renda imobiliária no Litoral Catarinense.
            </p>
            
            <p className="section-content sm:text-lg leading-relaxed text-base text-justify">
              Nosso objetivo é capacitar você, investidor, a compreender as oportunidades reais e os segredos para multiplicar seu patrimônio de forma acessível e segura, com aportes a partir de R$ 50 mil, com retorno de 3% ao mês.
            </p>
            
            <p className="section-content sm:text-lg leading-relaxed text-base text-justify">
              Acreditamos que, ao compartilhar nossa expertise e as melhores estratégias, podemos te guiar para que você também aproveite o potencial de um dos mercados mais valorizados do Brasil.
            </p>
            
            <p className="section-content sm:text-lg leading-relaxed text-base text-justify">
              A Super Live ARI é a nossa forma de abrir as portas para que mais pessoas construam um futuro financeiro sólido através do investimento inteligente no litoral catarinense.
            </p>
          </div>
          
          <div className="text-center mt-8 sm:mt-12">
            <Button onClick={scrollToForm} className="register-button px-6 sm:px-8 py-3 text-white rounded-lg font-semibold text-sm sm:text-base">
              QUERO PARTICIPAR DA SUPER LIVE ARI
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white py-8 px-4 bg-[#400140]">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-sm opacity-80">© 2025 A R I. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>;
};
export default LandingPage;
