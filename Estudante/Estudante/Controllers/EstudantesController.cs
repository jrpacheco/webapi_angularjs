using System.Web.Mvc;

namespace Estudante.Controllers
{
    public class EstudantesController : Controller
    {
        // GET: Estudantes
        public ActionResult Index()
        {
            return View();
        }
    }
}