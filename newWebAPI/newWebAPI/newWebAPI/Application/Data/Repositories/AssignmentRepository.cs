using Microsoft.EntityFrameworkCore;
using newWebAPI.Application.Data.Contexts;
using newWebAPI.Domain.Models;

namespace newWebAPI.Application.Data.Repositories
{
    public class AssignmentRepository
    {
        private readonly MySQLContext _context;

        public AssignmentRepository(MySQLContext context)
        {
            _context = context;
        }
        
        public async Task<Assignment> CreateAssignment(Assignment assignment)
        {
            var ret = await _context.Assignment.AddAsync(assignment);

            await _context.SaveChangesAsync();

            ret.State = EntityState.Detached;

            return ret.Entity;

        }

        public async Task<Assignment> GetAssignmentById(int AssignmentId)
        {
            Assignment? ret = await _context.Assignment.FindAsync(AssignmentId);

            return ret!;
        }

        public async Task<int> UpdateAssignment(Assignment assignment, Assignment updatedAssignment)
        {
            _context.Entry<Assignment>(assignment).CurrentValues.SetValues(updatedAssignment);

            return await _context.SaveChangesAsync();
        }

        public async Task<List<Assignment>> ListAssignmentByAssigmentList(int assignmentListId)
        {
            return await _context.Assignment.Include(a => a.AssignmentList).Where(a => a.AssignmentListId == assignmentListId).ToListAsync();
        }

        public async Task<int> DeleteAssignment(Assignment assignment)
        {
            _context.Assignment.Remove(assignment);

            return await _context.SaveChangesAsync();
        }

    }
}
