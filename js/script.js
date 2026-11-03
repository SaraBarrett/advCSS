const form = document.getElementById('form-modulo');
const mensagem = document.getElementById('mensagem');
const botao = form.querySelector('button[type="submit"]');
const modules = document.querySelector('#modules');


//carregar módulos
async function loadModules() {
  const { data, error } = await supabaseClient
    .from('software_developer_modules')
    .select('*')
    .order('created_at', {
      ascending: false
    });

  if (error) {
    console.error('Erro ao carregar os módulos:', error);
    return;
  }

  console.table(data);
  console.log(data);

}



form.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  const titulo = form.title.value.trim();

  if (!titulo) {
    mensagem.textContent = 'Introduz um título.';
    return;
  }

  botao.disabled = true;

  const id = crypto.randomUUID();
  const slug = titulo
    .normalize('NFD')
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const { error } = await supabaseClient
    .from('software_developer_modules')
    .insert({
      code: `SD-${id}`,
      title: titulo,
      slug: `${slug}-${id}`,
      status: 'published'
    });

  if (error) {
    mensagem.textContent = error.message;
  } else {
    form.reset();
    mensagem.textContent = 'Módulo adicionado!';
  }

  botao.disabled = false;
});


async function deleteModule(id) {
  const { error } = await supabaseClient
    .from('software_developer_modules')
    .delete()
    .eq('id', id);

  if (error) {
    mensagem.textContent = error.message;
  } else {
    mensagem.textContent = 'Módulo eliminado!';
  }
}

async function updateModule(id, titulo) {
  const { error } = await supabaseClient
    .from('software_developer_modules')
    .update({ title: titulo })
    .eq('id', id);

  if (error) {
    mensagem.textContent = error.message;
  } else {
    mensagem.textContent = 'Módulo atualizado!';
  }
}
modules.addEventListener('click', loadModules);