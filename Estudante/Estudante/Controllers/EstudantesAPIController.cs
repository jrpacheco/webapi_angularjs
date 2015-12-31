using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Estudante.Models;

namespace Estudante.Controllers
{
    public class EstudantesAPIController : ApiController
    {
        private dbEstudanteEntities db = new dbEstudanteEntities();

        // GET: api/EstudantesAPI
        public IQueryable<tbEstudante> GettbEstudante()
        {
            return db.tbEstudante;
        }

        // GET: api/EstudantesAPI/5
        [ResponseType(typeof(tbEstudante))]
        public IHttpActionResult GettbEstudante(int id)
        {
            tbEstudante tbEstudante = db.tbEstudante.Find(id);
            if (tbEstudante == null)
            {
                return NotFound();
            }

            return Ok(tbEstudante);
        }

        // PUT: api/EstudantesAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PuttbEstudante(int id, tbEstudante tbEstudante)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tbEstudante.Id)
            {
                return BadRequest();
            }

            db.Entry(tbEstudante).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tbEstudanteExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/EstudantesAPI
        [ResponseType(typeof(tbEstudante))]
        public IHttpActionResult PosttbEstudante(tbEstudante tbEstudante)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.tbEstudante.Add(tbEstudante);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (tbEstudanteExists(tbEstudante.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = tbEstudante.Id }, tbEstudante);
        }

        // DELETE: api/EstudantesAPI/5
        [ResponseType(typeof(tbEstudante))]
        public IHttpActionResult DeletetbEstudante(int id)
        {
            tbEstudante tbEstudante = db.tbEstudante.Find(id);
            if (tbEstudante == null)
            {
                return NotFound();
            }

            db.tbEstudante.Remove(tbEstudante);
            db.SaveChanges();

            return Ok(tbEstudante);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tbEstudanteExists(int id)
        {
            return db.tbEstudante.Count(e => e.Id == id) > 0;
        }
    }
}